const express =  require('express');

const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://admin:admin1@ds015730.mlab.com:15730/vote-de', function(err){
    if(err) console.log(err)
    else console.log("Connect to DB success!");
});

const QuestionModel =  require('./models/question');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/frontend'));

app.get("/", function(request, response){
    response.sendFile(__dirname + '/public/frontend/index.html')
});

app.get("/hoi-nhanh", function(request, response){
    response.sendFile(__dirname + '/public/frontend/hoi-nhanh.html')
});

app.get("chi-tiet?questionId="+questionId, function(request, response){
    response.sendFile(__dirname + '/public/frontend/chi-tiet.html')
});

// add question
app.post('/addquestion', function(request, response){
    QuestionModel.create({
        content: request.body.question 
    }).then(function(questionCreated){
        response.redirect('https://votede.herokuapp.com/chi-tiet?questionId='+questionCreated._id);
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/questioninfo/:questionId', function(request, response){
    console.log(request.params);
    const questionId = request.params.questionId;

    QuestionModel.findById(questionId).then(function(question){
        response.send(question);
    });
});

app.get('/randomquestion', function(request, response){
    QuestionModel.count({}).then(function(totalQuestion){
        QuestionModel.findOne({})
            .skip(Math.floor(Math.random()*totalQuestion))
            .then(function(question){
                response.send(question);
            });
    });

});

app.post('/vote/:questionId', function(request, response){
    const vote = request.body.vote;
    const questionId = request.params.questionId;

    QuestionModel.findByIdAndUpdate(questionId).then(function(question){
        if (question._id == questionId) {
            if (vote == 'yes') {
                question.yes += 1;
            } else if(vote == 'no') {
                question.no += 1;
            }
            question.save();
        }
        response.redirect('https://votede.herokuapp.com/chi-tiet?questionId='+questionId);
    })

});


const port = process.env.PORT || 6789;

app.listen(port, function(err) {
    if (err) console.log(err)
    else console.log('server start success')
});