
function getPosts(){


    $.get(`/api/expenses`, function(data){
        console.log(`Entries as of current: ${data}`);
        if(!data || !data.length){
            displayEmpty();

        }
        else{
            initializeRows();
        }
    });

}








function delPosts(id){

}




function displayEmpty() {
    
    
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    $("expense-container").append(messageH2);
}




function initializeRows() {
    
    const postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
}

