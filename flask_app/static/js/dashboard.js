// zenquotes.io is CORS enabled. Must move the api call to the server side
// function getQotd(){
//     fetch('https://zenquotes.io/api/random/')
//         .then(res =>  res.json())
//         .then(data => {
//             console.log(data);
//             var quote_div = document.getElementById('qotd');
//             quote_div.innerHTML = data['h'];
//             }
//         )
// }
// getQotd();

var my_sequence=[];

function get_user_sequences(){
    fetch('http://localhost:5001/sequences')
        .then(res =>  res.json())
        .then(data => {
            var content = document.getElementById('content');
            content.innerHTML = '';
            let create_btn = document.createElement('button');
            create_btn.innerHTML = 'Create New Sequence';
            create_btn.id = 'create_sequence';
            create_btn.addEventListener('click', function(){
                create_sequence();
            });
            content.appendChild(create_btn);
            for (let i=0; i<data.length; i++) {
                let row = document.createElement('tr');

                let title = document.createElement('td');
                title.innerHTML = data[i].sequence_title;
                row.appendChild(title);
                
                let description = document.createElement('td');
                description.innerHTML = data[i].sequence_description;
                row.appendChild(description);

                let visibility = document.createElement('td');
                visibility.innerHTML = data[i].sequence_visibility;
                row.appendChild(visibility);

                let view = document.createElement('td');
                let view_btn = document.createElement('button');
                view_btn.id = data[i].id;
                view_btn.innerHTML = 'View';
                view_btn.addEventListener('click', function(){
                    view_sequence(this.id);
                });
                view.appendChild(view_btn);
                row.appendChild(view);
                content.appendChild(row);
            }
        })
}
get_user_sequences();

function create_sequence() {
    my_sequence = [];
    var content = document.getElementById('content');
    content.innerHTML = '';
    
    let label_title = document.createElement('label');
    label_title.htmlFor = 'sequence_title';
    let title_text = document.createTextNode('Sequence Title: ');
    label_title.appendChild(title_text);
    let sequence_title = document.createElement('input');
    content.appendChild(label_title);
    sequence_title.type = 'text';
    sequence_title.id = 'sequence_title';
    sequence_title.name = 'sequence_title';
    content.appendChild(sequence_title);

    let label_description = document.createElement('label');
    label_description.htmlFor = 'sequence_description';
    let description_text = document.createTextNode('Sequence Description: ');
    label_description.appendChild(description_text);
    let sequence_description = document.createElement('input');
    content.appendChild(label_description);
    sequence_description.type = 'text';
    sequence_description.id = 'sequence_description';
    content.appendChild(sequence_description);

    let sequence_visibility_private = document.createElement('input')
    sequence_visibility_private.type = 'radio';
    sequence_visibility_private.id = 'visibility';
    sequence_visibility_private.name = 'visibility';
    sequence_visibility_private.value = '0';
    sequence_visibility_private.checked = true;

    let label_private = document.createElement('label');
    label_private.htmlFor = 'visibility';
    let private_text = document.createTextNode('Private');
    label_private.appendChild(private_text);
    content.appendChild(sequence_visibility_private);
    content.appendChild(label_private);
    
    let sequence_visibility_public = document.createElement('input')
    sequence_visibility_public.type = 'radio';
    sequence_visibility_public.id = 'visibility';
    sequence_visibility_public.name = 'visibility';
    sequence_visibility_public.value = '1';

    let label_public = document.createElement('label');
    label_public.htmlFor = 'visibility';
    let public_text = document.createTextNode('Public');
    label_public.appendChild(public_text);
    content.appendChild(sequence_visibility_public);
    content.appendChild(label_public);


    fetch('http://localhost:5001/cards')
        .then(res =>  res.json())
        .then(data => {
            for (let i=0; i<data.length; i++) {
                let row = document.createElement('tr');
                
                let card_number = document.createElement('td');
                card_number.innerHTML = data[i].card_number;
                row.appendChild(card_number);

                let card_title = document.createElement('td');
                card_title.innerHTML = data[i].card_title;
                row.appendChild(card_title);

                let card_content_front = document.createElement('td');
                card_content_front.innerHTML = data[i].card_content_front;
                row.appendChild(card_content_front);

                let add = document.createElement('td');
                let add_btn = document.createElement('button');
                add_btn.id = data[i].id;
                add_btn.innerHTML = 'Add to Sequence';
                add_btn.addEventListener('click', function(){
                    btn_maintain_card_sequence(this.id);
                });
                add.appendChild(add_btn);
                row.appendChild(add);
                content.appendChild(row);
            }
        })
    let save_btn = document.createElement('button');
    save_btn.innerHTML = 'Save Sequence';
    save_btn.addEventListener('click', function(){
        save_card_sequence();
    });
    content.appendChild(save_btn);
}

function btn_maintain_card_sequence(id)
{
    var active_btn = document.getElementById(id);
    if (my_sequence.includes(id)) {
        let index = my_sequence.indexOf(id);
        my_sequence.splice(index,1);
        active_btn.innerHTML="Add to Sequence";
    }
    else {
        my_sequence.push(id);
        active_btn.innerHTML="Remove from Sequence";
    }
}

function view_sequence(id)
{
    console.log("View Sequence", id)
    sequence_id = {
        "id": id
    }
    fetch('http://localhost:5001/sequence/view', {method:'POST', body: JSON.stringify(sequence_id), headers: {'Content-type': 'application/json; charset=UTF-8'}})
        .then(res =>  res.json())
        .then(data => {
            console.log(data)
            // for (let i=0; i<data.length; i++) {
            //     console.log(data[i])
            //}
        });
}

function save_card_sequence()
{
    console.log("saving sequence");
    sequence_data = {
        "sequence_visibility": document.querySelector('input[name="visibility"]:checked').value,
        "sequence_title": document.getElementById("sequence_title").value,
        "sequence_description": document.getElementById("sequence_description").value,
        "sequence_card_sequence": my_sequence
    }
    fetch('http://localhost:5001/sequence/save', {method:'POST', body: JSON.stringify(sequence_data), headers: {'Content-type': 'application/json; charset=UTF-8'}})
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            get_user_sequences();
        });
    
}