const express = require('express')
const createError = require('http-errors')
const { check, validationResult } = require('express-validator')
const { matchedData } = require('express-validator')
const mongoose = require('mongoose')
const studata = require('../model/Maindetail')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("registration", {
        title: "registration",
        tdata: "",
        error: "",
        data: ""
    })
})

router.post('/', [
    check('name', "must have some character!").isLength({ min: 3 }).trim(),
    check('email', "must be valid type!").isEmail().trim(),
    check('contact', "must be of length 10").isLength({ min: 10, max: 10 }).trim(),
    check('address', "must have some char more than 9").isLength({ min: 10 }).trim()
], (req, res, next) => {
    let id = req.body.id
    let error = validationResult(req)
    let completedata = matchedData(req)
    let name = req.body.name
    let email = req.body.email
    let contact = req.body.contact
    let address = req.body.address

    let studentcollection = new studata({
        name: name,
        email: email,
        contact: contact,
        address: address
    })

    if (!error.isEmpty()) {

        studata.find({}, (err, information) => {
            if (err) {
                next(new createError("found something wrong!"))
            } else {
                res.render('registration', {
                    title: "registration",
                    tdata: "",
                    error: error.mapped(),
                    data: completedata
                })
            }
        })
    } else {
        if (id) {
            studata.findByIdAndUpdate({ _id: id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    address: req.body.address
                }
            }, (err, intorm) => {
                if (err) {
                    next(new createError("saving data will found to be wrong!"))
                }
                else {
                    studata.find({}, (err, datas) => {
                        if (err) {
                            console.log(err)
                            next(new createError("foumd something wrong!"))
                        } else {
                            console.log(intorm)
                            res.render('registration', {
                                title: "registration",
                                tdata: datas,
                                error: "",
                                data: ""
                            })
                        }
                    })
                }
            })
        } else {
            studata.find({},(err,info)=>{
                console.log(info)
                  if (info=="") {
                    studentcollection.save((err,datum)=>{
                        if (err) {
                            next(new createError("found something wrong!")) 
                        } else {
                            studata.find({},(err,intro)=>{
                                if (err) {
                                 next(new createError("something wrong!"))
                                } else {
                                 res.render('registration', {
                                     title: "registration",
                                     tdata: intro,
                                     error: "",
                                     data: ""
                               })
                           }
                        })
                        }
                       
                   })
                  } else {
                    for(var i=0;i<info.length;i++){
                        if(info[i].name==name){
                            console.log("name mil gaya")
                         studata.findOneAndUpdate({name:name},{$set:{
                             name: req.body.name,
                             email: req.body.email,
                             contact: req.body.contact,
                             address: req.body.address
                         }},(err,dam)=>{
                                 if (err) {
                                      next(new createError("something wrong!"))
                                 } else {
                                    studata.find({},(err,intro)=>{
                                        if (err) {
                                         next(new createError("something wrong!"))
                                        } else {
                                         res.render('registration', {
                                             title: "registration",
                                             tdata: intro,
                                             error: "",
                                             data: ""
                                       })
                                   }
                                })
                             }
                         })
                         break;
                        }
                        else if(info[i].email==email){
                         console.log("email mil gaya")  
                         studata.findOneAndUpdate({email:email},{$set:{
                             name: req.body.name,
                             email: req.body.email,
                             contact: req.body.contact,
                             address: req.body.address
                         }},(err,dam)=>{
                                 if (err) {
                                      next(new createError("something wrong!"))
                                 } else {
                                    studata.find({},(err,intro)=>{
                                        if (err) {
                                         next(new createError("something wrong!"))
                                        } else {
                                         res.render('registration', {
                                             title: "registration",
                                             tdata: intro,
                                             error: "",
                                             data: ""
                                       })
                                   }
                                })
                             }
                         })
                           break;
 
                        }
                        else if(info[i].contact==contact){
                         console.log("contact mil gaya")
                         studata.findOneAndUpdate({contact:contact},{$set:{
                             name: req.body.name,
                             email: req.body.email,
                             contact: req.body.contact,
                             address: req.body.address
                         }},(err,dam)=>{
                                 if (err) {
                                      next(new createError("something wrong!"))
                                 } else {
                                    studata.find({},(err,intro)=>{
                                        if (err) {
                                         next(new createError("something wrong!"))
                                        } else {
                                         res.render('registration', {
                                             title: "registration",
                                             tdata: intro,
                                             error: "",
                                             data: ""
                                       })
                                   }
                                })
                             }
                         })
                         break;
                        }
                        else{
                         console.log("kuichh nahi mil gaya")
                            studentcollection.save((err,datum)=>{
                                 if (err) {
                                     next(new createError("found something wrong!")) 
                                 } else {
                                     studata.find({},(err,intro)=>{
                                         if (err) {
                                          next(new createError("something wrong!"))
                                         } else {
                                          res.render('registration', {
                                              title: "registration",
                                              tdata: intro,
                                              error: "",
                                              data: ""
                                        })
                                    }
                                 })
                                 }
                                
                            })
                            break;
                        }
                   }
                    
                  }    
               })
        }
    }
})

router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id
    studata.findByIdAndDelete({ _id: id }, (err, info) => {
        if (err) {
            next(new createError("foumd something wrong!"))
        } else {
            studata.find({}, (err, datas) => {
                if (err) {
                    next(new createError("foumd something wrong!"))
                } else {
                    res.render('registration', {
                        title: "registration",
                        tdata: datas,
                        error: "",
                        data: ""
                    })
                }
            })
        }
    })
})
router.get('/update/:id', (req, res, next) => {
    const id = req.params.id
    studata.findOne({ _id: id }, (err, info) => {
        if (err) {
            next(new createError("foumd something wrong!"))
        } else {
            studata.find({}, (err, inform) => {
                if (err) {
                    next(new createError("foumd something wrong!"))
                } else {
                    res.render('registration', {
                        title: "registration",
                        tdata: inform,
                        error: "",
                        data: info
                    })
                }
            })
        }
    })
})

module.exports = router