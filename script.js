// 데이터를 담을 변수
let books = [];

// 1. 데이터 불러오기
fetch('books.json')
    .then(response => {
        if (!response.ok) throw new Error('파일을 찾을 수 없습니다.');
        return response.json();
    })
    .then(data => {
        books = data;
        displayBooks(books); // 처음 접속 시 전체 목록 표시
    })
    .catch(error => {
        console.error('데이터 로드 실패:', error);
        const listElement = document.getElementById('bookList');
        if (listElement) listElement.innerHTML = '<p style="text-align:center;">도서 데이터를 불러오는 데 실패했습니다.</p>';
    });

// 2. 검색 함수
function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTypeSelect = document.getElementById('searchType');
    
    if (!searchInput || !searchTypeSelect) return; // 요소가 없으면 중단

    const query = searchInput.value.toLowerCase().trim();
    const searchType = searchTypeSelect.value;
    
    const filteredBooks = books.filter(book => {
        // 모든 필드를 안전하게 문자열로 변환 후 소문자화
        const title = book.title ? String(book.title).toLowerCase() : "";
        const author = book.author ? String(book.author).toLowerCase() : "";
        const publisher = book.publisher ? String(book.publisher).toLowerCase() : "";

        if (searchType === "title") return title.includes(query);
        if (searchType === "author") return author.includes(query);
        if (searchType === "publisher") return publisher.includes(query);
        
        // '전체' 검색일 경우
        return title.includes(query) || author.includes(query) || publisher.includes(query);
    });
    
    displayBooks(filteredBooks);
}

// 3. 버튼 클릭 및 엔터키 이벤트 (안전하게 연결)
window.onload = function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.onclick = searchBooks;
    }

    if (searchInput) {
        searchInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                searchBooks();
            }
        };
    }
};

// 4. 화면 출력 함수
function displayBooks(results) {
    const listElement = document.getElementById('bookList');
    const countElement = document.getElementById('resultCount');
    
    if (!listElement || !countElement) return;

    countElement.innerText = `검색 결과: 총 ${results.length}권`;
    listElement.innerHTML = '';

    if (results.length === 0) {
        listElement.innerHTML = '<div style="padding:50px; text-align:center; color:#999;">찾으시는 도서가 없습니다.</div>';
        return;
    }

    results.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
            <div class="book-title">${book.title || '제목없음'}</div>
            <div class="book-info">${book.author || '저자미상'} | ${book.publisher || '출판사'}</div>
            <div class="book-location"><span class="loc-tag">청구기호: ${book.location || '미정'}</span></div>
        `;
        listElement.appendChild(div);
    });
}
