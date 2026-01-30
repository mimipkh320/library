let books = [];

// 데이터 불러오기
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
        displayBooks(books);
    })
    .catch(error => console.error('데이터 오류:', error));

// 검색 함수
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchType = document.getElementById('searchType').value; // 선택된 카테고리
    
    const filteredBooks = books.filter(book => {
        const title = book.title ? String(book.title).toLowerCase() : "";
        const author = book.outhor ? String(book.outhor).toLowerCase() : ""; // 데이터 오타인 'outhor' 유지
        const publisher = book.publisher ? String(book.publisher).toLowerCase() : "";

        if (searchType === "title") {
            return title.includes(query);
        } else if (searchType === "outhor") {
            return author.includes(query);
        } else if (searchType === "publisher") {
            return publisher.includes(query);
        } else {
            // '전체' 검색일 경우
            return title.includes(query) || author.includes(query) || publisher.includes(query);
        }
    });
    
    displayBooks(filteredBooks);
}

// 엔터키 지원
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') searchBooks();
});

// 화면 출력 함수 (이전과 동일)
function displayBooks(results) {
    const listElement = document.getElementById('bookList');
    const countElement = document.getElementById('resultCount');
    
    countElement.innerText = `총 ${results.length}권이 검색되었습니다.`;
    listElement.innerHTML = '';

    if (results.length === 0) {
        listElement.innerHTML = '<div class="book-item" style="text-align:center; color:#999;">검색 결과가 없습니다.</div>';
        return;
    }

    results.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
            <div class="book-title">${book.title || '제목 없음'}</div>
            <div class="book-info">${book.outhor || '저자 미상'} | ${book.publisher || '출판사 없음'}</div>
            <div class="book-location">위치: ${book.location || '정보 없음'}</div>
        `;
        listElement.appendChild(div);
    });
}
