fetch('https://votede.herokuapp.com/randomquestion', {
            method: 'GET',
        }).then(function(response) {
            return response.json();
        }).then(function(data){
            console.log(data);
            console.log(document.querySelector('h1'));
            document.querySelector('h1').innerText = data.content;
            document.getElementById('detail').href = '/chi-tiet?questionId='+data._id;
            document.getElementById('vote').action = 'https://votede.herokuapp.com/vote/' + data._id;
            
        }).catch(function(err) {
            console.log("ERROR: ", err);
        });