const task_list = document.querySelector('#task_list');
const task_item = document.querySelector('.task_item');
const add_button = document.querySelector('#add_btn');
let todos = [];

// 플러스 버튼 클릭 시 빈 task_item 생성
add_button.addEventListener('click', addTaskItem);

function addTaskItem() {
    // item 객체 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    // todos에 추가
    todos.unshift(item);

    // 요소 생성하기
    const taskItemElement = createTaskElement(item);

    // list 가장 앞에 추가
    task_list.prepend(taskItemElement.taskItemElement);

    saveToLocalStorage();
}

function createTaskElement(item) {
    const taskItemElement = document.createElement('div');
    taskItemElement.classList.add('task_item');

    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = item.complete;
    if(item.complete) {
        taskItemElement.classList.add('complete');
    }

    const textElement = document.createElement('input');
    textElement.type = 'text';
    textElement.value = item.text;

    const taskBtnElement = document.createElement('div');
    taskBtnElement.classList.add('task_btn');

    const updateBtnElement = document.createElement('button');
    updateBtnElement.classList.add('update_btn');
    updateBtnElement.textContent = '수정';

    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.classList.add('delete_btn');
    deleteBtnElement.textContent = '삭제';


    // 체크박스 클릭시 
    checkboxElement.addEventListener('change', () => {
        item.complete = checkboxElement.checked;

        if(item.complete) {
            taskItemElement.classList.add('complete');
        } else {
            taskItemElement.classList.remove('complete');
        }

        saveToLocalStorage();
    });

    // 빈 공간 누르면 disable
    textElement.addEventListener('blur', () => {
        textElement.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    // 수정 버튼 누르면 disable 속성 해제
    updateBtnElement.addEventListener('click', () => {
        textElement.removeAttribute('disabled');
        textElement.focus();
    });

    // 삭제 버튼 클릭 시 객체와 노드 삭제
    deleteBtnElement.addEventListener('click', () => {
        todos = todos.filter(t => t.id!== item.id);
        taskItemElement.remove();
        saveToLocalStorage();
    });

    // input 발생 시 task 내용 삽입
    textElement.addEventListener('input', () => {
        item.text = textElement.value;
    });

    // 태그 넣기
    taskItemElement.appendChild(checkboxElement);
    taskItemElement.appendChild(textElement);
    taskItemElement.appendChild(taskBtnElement);
    taskBtnElement.appendChild(updateBtnElement);
    taskBtnElement.appendChild(deleteBtnElement);

    console.log(todos);

    return {taskItemElement};
};

displayTodos();

// localStorage에 데이터 저장
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem('todos', data);
}

// localStorage에서 데이터 불러오기
function loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    if(data) {
        todos = JSON.parse(data);
    }
}

// localStorage에서 불러온 데이터 화면에 표시
function displayTodos () {
    loadFromLocalStorage();
    todos.forEach((todo) => {
        const taskItemElement = createTaskElement(todo);
        task_list.append(taskItemElement.taskItemElement);
    })
};

