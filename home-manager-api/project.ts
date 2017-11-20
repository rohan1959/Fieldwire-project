let router = require('express').Router();
let models = require('./models/index.ts');
let Project = models.Project;
let Floorplan = models.Floorplan;
let floorplanStore = require('./floorplan.store.ts');
let formidable = require('formidable');
let util = require('util');
let thumb = require('node-thumbnail').thumb;
let fs = require('fs');
const path = require('path');

function paramProjectId(req, res, next, id) {
    Project.findById(id)
        .populate('floorplans')
        .exec((err, doc) => {
            if (err) return next(err);
            if (!doc) {
                err = new Error('Document not found');
                err.status = 404;
                return next(err);
            }
            req.project = doc;
            return next();
        });
}

function getProjects(req, res, next) {
    Project.find({}).sort({ createdAt: -1 }).exec((err, projects) => {
        if (err)
            return next(err);
        res.json(projects);
    });
}
function createProject(req, res, next) {
    const project = new Project(req.body);
    project.save((err, project) => {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.json(project);
    });
}
function getProject(req, res) {
    res.json(req.project);
}
function createFloorplan(req, res) {
    console.log("create floorplan");
    //todo create a floorplan
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log("parse floorplan");
        let fileName =  files.floorplan.name.split('.')[0];
        let fileExtension = files.floorplan.name.split('.')[1];
        let fileComponents = files.floorplan.path.split(path.sep)
        let filePath = fileComponents.slice(0, fileComponents.length - 1).join(path.sep);
        let uploadFileName = fileComponents[fileComponents.length - 1].split('.')[0];
        console.log(uploadFileName, fileName, fileExtension, filePath, files.floorplan.path, util.inspect({fields: fields, files: files}));

        console.log("find floorplan");
        //check if file already exists
        Floorplan.findOne({
            name: files.floorplan.name,
            _creator: req.project._id
        }).exec((err, existingFloorplan) => {

            console.log("Existing floorplan", existingFloorplan);

            let newVersion = existingFloorplan ? (existingFloorplan.version + 1) : 1;
            let newFileName = `${fileName}_${newVersion}.${fileExtension}`;

            if(files.floorplan.type === 'application/pdf') {
                floorplanStore.uploadFile(files.floorplan.path, newFileName)
                    .then(() => {
                        fs.unlink(files.floorplan.path);

                        if(existingFloorplan) {
                            existingFloorplan.version = newVersion;
                            existingFloorplan.blueprint = newFileName;

                            existingFloorplan.save((err, floorplan) => {
                                res.json(floorplan);
                            });
                        } else {
                            let floorplan = new Floorplan({
                                name: files.floorplan.name,
                                blueprint: newFileName,
                                type: files.floorplan.type,
                                _creator: fields.projectId,
                                version: 0
                            });

                            floorplan.save((err, floorplan) => {
                                req.project.floorplans.push(floorplan);

                                req.project.save((err, project) => {
                                    res.json(floorplan);
                                });
                            });
                        }
                    });
            } else if(files.floorplan.type === 'image/jpeg' || files.floorplan.type === 'image/png') {
                console.log('thumb generation');
                Promise.all([
                    thumb({
                        source: files.floorplan.path,
                        destination: filePath,
                        suffix: '_thumb_300',
                        width:'300'
                    }),
                    thumb({
                        source: files.floorplan.path,
                        destination: filePath,
                        suffix: '_thumb_2000',
                        width:'2000'
                    })
                ])
                    .then(() => {
                        console.log('upload');
                        return Promise.all([
                            floorplanStore.uploadFile(files.floorplan.path, newFileName),
                            floorplanStore.uploadFile(`${filePath}${path.sep}${uploadFileName}_thumb_300.${fileExtension}`, `${fileName}_${newVersion}_thumb_300.${fileExtension}`),
                            floorplanStore.uploadFile(`${filePath}${path.sep}${uploadFileName}_thumb_2000.${fileExtension}`, `${fileName}_${newVersion}_thumb_2000.${fileExtension}`)
                        ])
                    })
                    .then(() => {
                        console.log('then');
                        fs.unlink(`${filePath}${path.sep}${uploadFileName}_thumb_300.${fileExtension}`);
                        fs.unlink(`${filePath}${path.sep}${uploadFileName}_thumb_2000.${fileExtension}`);
                        fs.unlink(files.floorplan.path);

                        if(existingFloorplan) {
                            console.log('update');
                            existingFloorplan.version = newVersion;
                            existingFloorplan.blueprint = newFileName;
                            existingFloorplan.thumb_300 = `${fileName}_${newVersion}_thumb_300.${fileExtension}`;
                            existingFloorplan.thumb_2000 = `${fileName}_${newVersion}_thumb_2000.${fileExtension}`;

                            existingFloorplan.save((err, floorplan) => {
                                res.json(floorplan);
                            });
                        } else {
                            console.log('save');
                            let floorplan =  new Floorplan({
                                name: files.floorplan.name,
                                blueprint: newFileName,
                                thumb_300: `${fileName}_${newVersion}_thumb_300.${fileExtension}`,
                                thumb_2000: `${fileName}_${newVersion}_thumb_2000.${fileExtension}`,
                                type: files.floorplan.type,
                                _creator: fields.projectId,
                                version: newVersion
                            });

                            floorplan.save((err, floorplan) => {
                                req.project.floorplans.push(floorplan);

                                req.project.save((err, project) => {
                                    res.json(floorplan);
                                });
                            });
                        }

                    }).catch(err => {
                        console.log("Error in Thumbnail Generation", err);
                    })
            } else {
                res.status(400);
                res.json({message: "File Extension not supported"});
            }
        });


    });

    return;
}

router.param('projectId', paramProjectId);

router.get('/api/projects', getProjects);
router.post('/api/projects', createProject);
router.get('/api/projects/:projectId', getProject);
router.post('/api/projects/:projectId/floorplans', createFloorplan);

module.exports = router;