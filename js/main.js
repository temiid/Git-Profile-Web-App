$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let USER_NAME = e.target.value;

        //To Make request to Github

        const URL = `https://api.github.com/users/${USER_NAME}`;

        $.ajax({

            url: URL,

            data:{
                client_id: '09b42f3386e27e4f9323',
                client_secret: '56ae3db1a142f188fb7ccc2e0c0dd651e4472950',
            }

        }).done(function(userRequest){

          $.ajax({

            url: `${URL}/repos`,

            data:{
                client_id: '09b42f3386e27e4f9323',
                client_secret: '56ae3db1a142f188fb7ccc2e0c0dd651e4472950',
                sort: 'created: asc',
                per_page: 5
            }

          }).done(function(repos){
            
            $.each(repos, function (index, repo){

                $('#repo-details').append(`

                    <div class="well">
                        <div class="row">

                            <div class="col-md-7">
                                <strong>${repo.name}</strong>: ${repo.description}
                            </div>

                            <div class="col-md-3">
                            <span class="label label-default">Fork: ${repo.forks_count}</span>
                            <span class="label label-danger">Watchers: ${repo.watchers_count}</span>
                            <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                            </div>

                            <div class="col-md-2">
                                <a href="${repo.html_url}" target="_black" class="btn btn-primary">Visit Repo Page</a>
                            </div>

                        </div>
                    </div>

                `)//.append ends    

            });//each loop function

          });//ajax done for REPOS



            $('#profile').html(`
            
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${userRequest.name}</h3>
                    </div>

                    <div class="panel-body">
                        <div class="row">

                            <div class="col-md-3">
                                <img class="thumbnail avatar" src="${userRequest.avatar_url}">
                                <a class="btn btn-primary btn-block" target="_blank" href="${userRequest.html_url}">View Profile</a>
                            </div>

                            <div class="col-md-9">
                                <span class="label label-default">Public Repos: ${userRequest.public_repos}</span>
                                <span class="label label-primary">Public Gists: ${userRequest.public_gists}</span>
                                <span class="label label-success">Followers: ${userRequest.followers}</span>
                                <span class="label label-danger">Following: ${userRequest.following}</span>

                                <br><br>

                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${userRequest.company}</li>
                                    <li class="list-group-item">Website/blog: ${userRequest.blog}</li>
                                    <li class="list-group-item">Location: ${userRequest.location}</li>
                                    <li class="list-group-item">Joined: ${userRequest.created_at}</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <h3 class="page-header">Latest Repository</h3>
                <div id="repo-details"></div>
            
            `);//.html end

          })//ajax done for USER_NAME

    })//#searchUser function ends

})//jquery ends