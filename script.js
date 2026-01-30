let books = [];

// 1. 데이터 불러오기
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
        displayBooks(books);
    })
    .catch(error => {
        console.error('데이터 로드 실패:', error);
        document.getElementById('bookList').innerHTML = "데이터를 불러오는 데 실패했습니다.";
    });

// 2. 검색 함수
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchType = document.getElementById('searchType').value;
    
    const filteredBooks = books.filter(book => {
        // 데이터 필드 추출 (데이터에 적힌 그대로 outhor 사용)
        const title = book.title ? String(book.title).toLowerCase() : "";
        const author = book.outhor ? String(book.outhor).toLowerCase() : "";
        const publisher = book.publisher ? String(book.publisher).toLowerCase() : "";

        if (searchType === "title") {
            return title.includes(query);
        } else if (searchType === "outhor") {
            return author.includes(query);
        } else if (searchType === "publisher") {
            return publisher.includes(query);
        } else {
            // 전체 검색
            return title.includes(query) || author.includes(query) || publisher.includes(query);
        }
    });
    
    displayBooks(filteredBooks);
}

// 3. 이벤트 리스너 (버튼 클릭 및 엔터키)
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if(searchBtn) {
        searchBtn.addEventListener('click', searchBooks);
    }

    if(searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchBooks();
        });
    }
});

// 4. 화면 출력
function displayBooks(results) {
    const listElement = document.getElementById('bookList');
    const countElement = document.getElementById('resultCount');
    
    countElement.innerText = `총 ${results.length}권이 검색되었습니다.`;
    listElement.innerHTML = '';

    if (results.length === 0) {
        listElement.innerHTML = '<div class="book-item" style="text-align:center;">검색 결과가 없습니다.</div>';
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
