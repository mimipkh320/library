let books = [];

// 1. 데이터 불러오기 (books.json 파일이 있어야 함)
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
        displayBooks(books); // 처음엔 전체 목록 표시
    });

// 2. 검색 함수
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.publisher.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

// 3. 엔터키 검색 지원
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchBooks();
});

// 4. 화면에 출력
function displayBooks(results) {
    const listElement = document.getElementById('bookList');
    const countElement = document.getElementById('resultCount');
    
    countElement.innerText = `총 ${results.length}권이 검색되었습니다.`;
    listElement.innerHTML = '';

    results.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-info">${book.author} | ${book.publisher}</div>
            <div class="book-location">위치: ${book.location}</div>
        `;
        listElement.appendChild(div);
    });
}
