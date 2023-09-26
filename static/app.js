async function editMemo(e){
    const id = e.target.dataset.id;
    const editInput = prompt('수정할 값을 입력하세요.');
    const res = await fetch(`/memos/${id}`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id, // id: id 키와 값이 같을 때 생략가능
            content: editInput,
        }),
    });
    readMemo();
}

async function deleteMemo(e){
    const id = e.target.dataset.id;
    const res = await fetch(`/memos/${id}`,{
        method: "DELETE",
    });
    readMemo();
}

function displayMemo(memo){
    const ul = document.querySelector('#memo-ul');
    const li = document.createElement('li');
    li.innerText = `[id:${memo.id}] ${memo.content}`;
    const editBtn = document.createElement('button');
    
    editBtn.innerText = '수정하기';
    editBtn.addEventListener('click', editMemo);
    editBtn.dataset.id = memo.id;

    const delBtn = document.createElement('button');
    delBtn.innerText = '삭제하기';
    delBtn.addEventListener('click', deleteMemo);
    delBtn.dataset.id = memo.id;

    ul.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
}

async function readMemo(){
    const res = await fetch('/memos');
    const jsonRes = await res.json();
    const ul = document.querySelector('#memo-ul');
    ul.innerHTML = "";
    jsonRes.forEach(displayMemo);
}

async function createMemo(value){
    const res = await fetch('/memos', {// fetch 디폴트 = get요청
        method: "POST", // option 으로 post 요청 바꿀 수 있다
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
        })
    }); 
    const memo = await res.json();
    displayMemo(memo);
}

function handleSubmit(e){
    e.preventDefault();
    const input = document.querySelector('#memo-input');
    createMemo(input.value);
    input.value = '';
}

const form = document.querySelector('#memo-form');
form.addEventListener('submit', handleSubmit);

readMemo();