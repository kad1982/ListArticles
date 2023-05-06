
(function () {

	async function loadPosts() {
		const pageParams = new URLSearchParams(window.location.search);
		const pageId = pageParams.get('page');
		let strPage = '';
		if (pageId != null) {
			strPage = `?page=${pageId}`;
		};
		
		const response = await fetch(`https://gorest.co.in/public-api/posts${strPage}`);
		const data = await response.json();
		return {
			posts: data.data,
			pagination: data.meta.pagination,
		}
	}

	async function loadPostList() {
		const post = await loadPosts();
		const postList = document.querySelector('.posts_list');
		for (let i = 0; i < post.posts.length; i++) {
			li = document.createElement('li');
			a = document.createElement('a');
			a.classList.add('post-link');
			a.href = `post.html?id=${post.posts[i].id}`;
			a.textContent = `Статья ${i+1}`;
			li.append(a);
			postList.append(li);
		}
	}

	async function createNav() {
		const pagination = await loadPosts();
		const postNavElement = document.querySelector('.page-wrapper');
		for (let i = 1; i < pagination.pagination.pages; i++) {
			li = document.createElement('li');
			a = document.createElement('a');
			a.classList.add('swiper-slide');
			a.classList.add('page-slide')
			if (i==1){
				a.href='index.html'}
			else{
			a.href = `index.html?page=${i}`};
			a.textContent = `страница ${i} из  ${pagination.pagination.pages-1}`;
			a.add
			li.append(a);
			postNavElement.append(li);
		}
		loadPostList();
	}

	async function loadPost() {

		const pageParams = new URLSearchParams(window.location.search);
		const postId = pageParams.get('id');
		const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
		const data = await response.json();
		return {
			post: data.data,
		}
	}
async function loadCommentsPost(){
	const pageParams = new URLSearchParams(window.location.search);
		const postId = pageParams.get('id');
// console.log(`https://gorest.co.in/public-api/comments?post_id=${postId}`);

		const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`);
		const data = await response.json();
		return {
			comment: data.data,
		}
}


	async function createPostPage() {
		const post = await loadPost();
		const postPage = document.querySelector('.post-block');

		div = document.createElement('div');
		div.classList.add('card');
		divCardBody = document.createElement('div');
		divCardBody.classList.add('card-body');
		h1 = document.createElement('h1');
		h1.classList.add('card-title');
		h1.textContent = `${post.post.title}`;
		divCardBody.append(h1);
		p = document.createElement('p');
		p.textContent = `${post.post.body}`;
		p.classList.add('card-text');
		divCardBody.append(p);
		div.append(divCardBody);
		postPage.append(div);

		const comment =  await loadCommentsPost();
		const commentPage = document.querySelector('.comments-block');
		for(let i=0; i<comment.comment.length;i++){

		
		div = document.createElement('div');
		div.classList.add('card');
		divCardBody = document.createElement('div');
		divCardBody.classList.add('card-body');
		h1 = document.createElement('h1');
		h1.classList.add('card-title');

		h1.textContent = `${comment.comment[i].name}`;
		divCardBody.append(h1);
		p = document.createElement('p');
		p.textContent = `${comment.comment[i].email}`;
		p.classList.add('card-header');
		divCardBody.append(p);
		p = document.createElement('p');
		p.textContent = `${comment.comment[i].body}`;
		p.classList.add('card-text');
		divCardBody.append(p);
		div.append(divCardBody);
		commentPage.append(div);
		}
	}

	const postPage = document.querySelector('.post-block');
	if (postPage){
		createPostPage();
	}
	else{
	createNav();
}



})();