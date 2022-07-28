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
    var content = document.getElementById('content');
    content.innerHTML = '';

    let page_header = document.createElement('div');
    page_header.classList = "page-header mt-3 mb-3";
    let page_title = document.createElement('h4');
    page_title.innerHTML = "My Saved Yoga Nidra Sequences";
    page_header.appendChild(page_title);
    content.appendChild(page_header);

    let table_layout = document.createElement('table');
    table_layout.classList = "table table-striped table-hover";
    let table_head = document.createElement('thead');
    let table_row = document.createElement('tr');
    let th_sequence_title = document.createElement('th');
    th_sequence_title.innerHTML = "Title";
    let th_sequence_visibility = document.createElement('th');
    th_sequence_visibility.innerHTML = "Visibility";
    let th_sequence_played = document.createElement('th');
    th_sequence_played.innerHTML = 'Played Count';
    let th_sequence_created = document.createElement('th');
    th_sequence_created.innerHTML = "Date Created";
    let th_sequence_view = document.createElement('th');
    th_sequence_view.innerHTML = "";
    let table_body = document.createElement('tbody');
    table_head.appendChild(table_row);
    table_row.appendChild(th_sequence_title);
    table_row.appendChild(th_sequence_visibility);
    table_row.appendChild(th_sequence_played);
    table_row.appendChild(th_sequence_created);
    table_row.appendChild(th_sequence_view);
    table_layout.appendChild(table_head);
    table_layout.appendChild(table_body);
    // content.appendChild(table_layout);
            // let table_body_row = document.createElement('tr');
            // table_body.appendChild(table_body_row);
            // table_body_row.appendChild(th_sequence_created);
    fetch('http://localhost:5001/sequences')
        .then(res =>  res.json())
        .then(data => {
            for (let i=0; i<data.length; i++) {
                let table_body_row = document.createElement('tr');
                let td_sequence_title = document.createElement('td');
                td_sequence_title.innerHTML = data[i].sequence_title;
                table_body_row.appendChild(td_sequence_title);

                let td_sequence_visibility = document.createElement('td');
                if (data[i].sequence_visibility == 0) {
                    td_sequence_visibility.innerHTML = "Private";
                } else {
                    td_sequence_visibility.innerHTML = "Public";
                };
                table_body_row.appendChild(td_sequence_visibility);

                let td_played_count = document.createElement('td');
                td_played_count.innerHTML = data[i].sequence_played_count;
                table_body_row.appendChild(td_played_count);

                let td_date_created = document.createElement('td');
                table_body_row.appendChild(td_date_created);
                const date_created = new Date(data[i].created_at);
                td_date_created.innerHTML = date_created.toDateString();
                let td_view_btn = document.createElement('td');
                let seq_view_btn = document.createElement('button');
                seq_view_btn.id = data[i].id;
                seq_view_btn.innerHTML = 'View Sequence';
                seq_view_btn.classList =  "btn btn-outline-primary"
                seq_view_btn.addEventListener('click', function(){
                    view_sequence(this.id);
                });
                td_view_btn.appendChild(seq_view_btn);
                table_body_row.appendChild(td_view_btn);
                table_body.appendChild(table_body_row);
            }
            content.appendChild(table_layout);
        })
}
get_user_sequences();

function create_sequence() {

    my_sequence = [];
    var content = document.getElementById('content');
    content.innerHTML = '';

    let page_header = document.createElement('div');
    page_header.classList = "page-header mt-3 mb-3";
    let page_title = document.createElement('h5');
    page_title.innerHTML = "Create a New Yoga Nidra Sequence";
    page_header.appendChild(page_title);
    content.appendChild(page_header);

    let header_row = document.createElement('div');
    header_row.classList='row';
    header_row.setAttribute("id","sequence_header");
    let header_col1 = document.createElement('div');
    header_col1.classList='col-4 bg-light';
    let header_col2 = document.createElement('div');
    header_col2.classList='col-4 bg-light';
    let header_col3 = document.createElement('div');
    header_col3.classList='col-2 bg-light';
    let header_col4 = document.createElement('div');
    header_col4.classList='col-2';
    
    content.appendChild(header_row);
    header_row.appendChild(header_col1);
    let sequence_title_input = document.createElement('input');
    sequence_title_input.type = 'text';
    sequence_title_input.classList = "form-control";
    sequence_title_input.id = 'sequence_title';
    sequence_title_input.name = 'sequence_title';
    header_col1.appendChild(sequence_title_input);

    header_row.appendChild(header_col2);
    let sequence_description_input = document.createElement('input');
    sequence_description_input.type = 'text';
    sequence_description_input.classList = "form-control";
    sequence_description_input.id = 'sequence_description';
    sequence_description_input.name = 'sequence_description';
    header_col2.appendChild(sequence_description_input);

    header_row.appendChild(header_col3);
    let radio_button_div_private = document.createElement('div');
    header_col3.appendChild(radio_button_div_private);
    let sequence_visibility_private = document.createElement('input');
    sequence_visibility_private.type = 'radio';
    sequence_visibility_private.id = 'visibility';
    sequence_visibility_private.name = 'visibility';
    sequence_visibility_private.value = '0';
    sequence_visibility_private.checked = true;

    let label_private = document.createElement('label');
    label_private.htmlFor = 'visibility';
    let private_text = document.createTextNode('Private');
    label_private.appendChild(private_text);
    radio_button_div_private.appendChild(sequence_visibility_private);
    radio_button_div_private.appendChild(label_private);
    
    let radio_button_div_public = document.createElement('div');
    header_col3.appendChild(radio_button_div_public);
    let sequence_visibility_public = document.createElement('input')
    sequence_visibility_public.type = 'radio';
    sequence_visibility_public.id = 'visibility';
    sequence_visibility_public.name = 'visibility';
    sequence_visibility_public.value = '1';

    let label_public = document.createElement('label');
    label_public.htmlFor = 'visibility';
    let public_text = document.createTextNode('Public');
    label_public.appendChild(public_text);
    radio_button_div_public.appendChild(sequence_visibility_public);
    radio_button_div_public.appendChild(label_public);


    header_row.appendChild(header_col4);
    let header_save_btn = document.createElement('p');
    header_save_btn.innerHTML='';
    header_col4.appendChild(header_save_btn);

    let save_btn = document.createElement('button');
    save_btn.innerHTML = 'Save Sequence';
    save_btn.classList = "btn btn-success";
    save_btn.addEventListener('click', function(){
        save_card_sequence();
    });
    header_col4.appendChild(save_btn);

    content.appendChild(header_row);
    header_row.appendChild(header_col1);
    let header_title = document.createElement('p');
    header_title.innerHTML='Title';
    header_col1.appendChild(header_title);

    header_row.appendChild(header_col2);
    let header_description = document.createElement('p');
    header_description.innerHTML='Description';
    header_col2.appendChild(header_description);

    header_row.appendChild(header_col3);
    let header_visibility = document.createElement('p');
    header_visibility.innerHTML='Visibility';
    header_col3.appendChild(header_visibility);

    header_row.appendChild(header_col4);
    let header_save = document.createElement('p');
    header_save.innerHTML='';
    header_col4.appendChild(header_save);

    let card_row = document.createElement('div');
    card_row.classList = "row";
    card_row.setAttribute("id","cards_list");
    content.appendChild(card_row);
    let card_col = document.createElement('div');
    card_col.classList = "col-md-12";
    card_row.appendChild(card_col);
    let card_id_div = document.createElement("div");
    card_id_div.setAttribute("id", "sequence-cards");
    card_col.appendChild(card_id_div);

    fetch('http://localhost:5001/cards')
        .then(res =>  res.json())
        .then(data => {
            for (let i=0; i<data.length; i++) {
                let card_class = document.createElement("div");
                card_class.classList = "card";
                let card_header_class = document.createElement("div");
                card_header_class.classList = "card-header phase"+ data[i].phase_number;
                card_class.appendChild(card_header_class);
                let card_header_def = document.createElement("a");
                card_header_def.setAttribute("class", "link-light text-decoration-none");
                card_header_def.setAttribute("data-toggle", "collapse");
                card_header_def.setAttribute("data-parent", "#sequence-cards");
                card_header_def.setAttribute("href", "#card-element-"+data[i].id);
                card_header_def.innerHTML = data[i].phase_number_text+" "+
                                        data[i].phase_name+" "+
                                        data[i].phase_description+" "+
                                        data[i].phase_choose_description+" &emsp;"+
                                        data[i].card_title;
                card_header_class.appendChild(card_header_def);
                let card_body_def = document.createElement("div");
                card_body_def.classList = "collapse text-bg-light bg-parchment";
                card_body_def.setAttribute("id", "card-element-"+data[i].id);
                card_class.appendChild(card_body_def);
                let card_body_class = document.createElement("div");
                card_body_class.classList = "card-body";
                card_body_class.innerHTML = data[i].card_content_front;
                card_body_def.appendChild(card_body_class);
                let add_btn = document.createElement('button');
                add_btn.id = data[i].id;
                add_btn.innerHTML = 'Add to Sequence';
                add_btn.classList = "btn btn-outline-success m-3";
                add_btn.addEventListener('click', function(){
                    btn_maintain_card_sequence(this.id);
                });
                card_body_def.appendChild(add_btn);
                card_id_div.appendChild(card_class);
            }
        })
}

function btn_maintain_card_sequence(id)
{
    var active_btn = document.getElementById(id);
    if (my_sequence.includes(id)) {
        let index = my_sequence.indexOf(id);
        my_sequence.splice(index,1);
        active_btn.innerHTML="Add to Sequence";
        active_btn.classList="btn btn-outline-success m-3"
    }
    else {
        my_sequence.push(id);
        active_btn.innerHTML="Remove from Sequence";
        active_btn.classList="btn btn-danger m-3";
    }
}

function view_sequence(id)
{
    var content = document.getElementById('content');
    content.innerHTML = '';

    console.log("View Sequence", id)
    sequence_id = {
        "id": id
    }
    fetch('http://localhost:5001/sequence/view', {method:'POST', body: JSON.stringify(sequence_id), headers: {'Content-type': 'application/json; charset=UTF-8'}})
        .then(res =>  res.json())
        .then(data => {
            //  console.log(data);
            let page_header = document.createElement('div');
            page_header.classList = "page-header mt-3 mb-3";
            let page_title = document.createElement('h5');
            page_title.innerHTML = "Viewing Saved Sequence";
            page_header.appendChild(page_title);
            content.appendChild(page_header);

            let header_row = document.createElement('div');
            header_row.classList='row';
            header_row.setAttribute("id","sequence_header");
            let header_col1 = document.createElement('div');
            header_col1.classList='col-4 bg-light';
            let header_col2 = document.createElement('div');
            header_col2.classList='col-2 bg-light';
            let header_col3 = document.createElement('div');
            header_col3.classList='col-2 bg-light';
            let header_col4 = document.createElement('div');
            header_col4.classList='col-2 bg-light';
            let header_col5 = document.createElement('div');
            header_col5.classList='col-2';
            
            content.appendChild(header_row);
            header_row.appendChild(header_col1);
            let header_title_data = document.createElement('h4');
            header_title_data.innerHTML=data[0].sequence_title;
            header_col1.appendChild(header_title_data);
            header_row.appendChild(header_col2);
            let header_visibility_data = document.createElement('h4');
            if (data[0].sequence_visibility == 0) {
                header_visibility_data.innerHTML = "Private";
                } else {
                    header_visibility_data.innerHTML = "Public";
                };
            header_col2.appendChild(header_visibility_data);
            header_row.appendChild(header_col3);
            let header_played_count_data = document.createElement('h4');
            header_played_count_data.innerHTML=data[0].sequence_played_count;
            header_col3.appendChild(header_played_count_data);
            header_row.appendChild(header_col4);
            let header_last_played_data = document.createElement('h4');
            header_last_played_data.innerHTML=!data[0].sequence_last_played == null ? data[0].sequence_last_played : "Never";
            header_col4.appendChild(header_last_played_data);
            header_row.appendChild(header_col5);
            let delete_sequence_btn = document.createElement('button');
            delete_sequence_btn.id = data[0].id;
            delete_sequence_btn.innerHTML = 'Delete Sequence';
            delete_sequence_btn.classList = "btn btn-danger"
            delete_sequence_btn.addEventListener('click', function(){
                btn_delete_sequence(this.id);
            });
            header_col5.appendChild(delete_sequence_btn);

            content.appendChild(header_row);
            header_row.appendChild(header_col1);
            let header_title = document.createElement('p');
            header_title.innerHTML='Title';
            header_col1.appendChild(header_title);
            header_row.appendChild(header_col2);
            let header_visibility = document.createElement('p');
            header_visibility.innerHTML='Visibility';
            header_col2.appendChild(header_visibility);
            header_row.appendChild(header_col3);
            let header_played_count = document.createElement('p');
            header_played_count.innerHTML='Played Count';
            header_col3.appendChild(header_played_count);
            header_row.appendChild(header_col4);
            let header_last_played = document.createElement('p');
            header_last_played.innerHTML='Last Played';
            header_col4.appendChild(header_last_played);
            header_row.appendChild(header_col5);
            let header_delete = document.createElement('p');
            header_delete.innerHTML='';
            header_col5.appendChild(header_delete);
            
            let card_row = document.createElement('div');
            card_row.classList = "row";
            card_row.setAttribute("id","cards_list");
            content.appendChild(card_row);
            let card_col = document.createElement('div');
            card_col.classList = "col-md-12";
            card_row.appendChild(card_col);
            let card_id_div = document.createElement("div");
            card_id_div.setAttribute("id", "sequence-cards");
            card_col.appendChild(card_id_div);

            // for (let i=0; i<1; i++) {
            for (let i=0; i<data[1].length; i++) {
            //     // console.log(data[1][i].card_content_front)
                let card_class = document.createElement("div");
                card_class.classList = "card";
                let card_header_class = document.createElement("div");
                card_header_class.classList = "card-header phase"+data[1][i].phase_number;
                card_class.appendChild(card_header_class);
                let card_header_def = document.createElement("a");
                card_header_def.setAttribute("class", "link-light text-decoration-none");
                card_header_def.setAttribute("data-toggle", "collapse");
                card_header_def.setAttribute("data-parent", "#sequence-cards");
                card_header_def.setAttribute("href", "#card-element-"+data[1][i].id);
                card_header_def.innerHTML =  data[1][i].phase_number_text+" "+
                                        data[1][i].phase_name+" "+
                                        data[1][i].phase_description+" "+
                                        data[1][i].phase_choose_description+" &emsp;"+
                                        data[1][i].card_title;
                card_header_class.appendChild(card_header_def);
                let card_body_def = document.createElement("div");
                card_body_def.classList = "collapse text-bg-light bg-parchment";
                card_body_def.setAttribute("id", "card-element-"+data[1][i].id);
                card_class.appendChild(card_body_def);
                let card_body_class = document.createElement("div");
                card_body_class.classList = "card-body";
                card_body_class.innerHTML = data[1][i].card_content_front;
                card_body_def.appendChild(card_body_class);
                card_id_div.appendChild(card_class);
            }
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

function btn_delete_sequence(id)
{
    console.log("deleting sequence");
    data = {
        "sequence_id" : id
    }
    fetch('http://localhost:5001/sequence/delete', {method:'POST', body: JSON.stringify(data), headers: {'Content-type': 'application/json; charset=UTF-8'}})
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            get_user_sequences();
        });
    
}