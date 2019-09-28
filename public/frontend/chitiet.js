// console.log(window.location.search)
        const searchParam = new URLSearchParams(window.location.search);
        const questionId = searchParam.get('questionId');
        // console.log(questionId); 

        fetch('https://votede.herokuapp.com/questioninfo/'+questionId, {
            method: 'GET',
        }).then(function(response) {
            return response.json();
        }).then(function(data){
            console.log(data);
            console.log(document.querySelector('h1'));
            document.querySelector('h1').innerText = data.content;
            document.querySelector('p').innerText = data.yes + data.no + ' vote';
            // document.querySelector('#yes').innerText = data.yes + 'yes';
            document.getElementById('no').innerText = 'No: ' + ((data.no/(data.yes+data.no))*100).toFixed(2) + '%';
            document.getElementById('yes').innerText = 'Yes: ' + ((data.yes/(data.yes+data.no))*100).toFixed(2) + '%';
            document.getElementById('yes').style.width = (data.yes/(data.yes+data.no))*100 + '%';
            document.getElementById('no').style.width = (data.no/(data.yes+data.no))*100 + '%';
            if(data.yes == 0 && data.no == 0){
                document.getElementById('no').innerText = 'No: ' + '0%';
                document.getElementById('yes').innerText = 'Yes: ' + '0%';
                document.getElementById('yes').style.width = '50%';
                document.getElementById('no').style.width = '50%';
            }
        }).catch(function(err) {
            console.log("ERROR: ", err);
        })