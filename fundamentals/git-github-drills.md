## Before we begin...

Each person open your terminal and enter the following:

`git config --global alias.lg "log --oneline --all --graph --decorate"`

This creates an "alias" so that the command `git lg` will actually translate to `git log --oneline --all --graph --decorate`, so you don't have to type it every time. This command prints out a very clean history of all the commits in your repo, including branches. Note: `git log` only works inside of a git repo, so continue with the drills below and use `git lg` to see your commit history.

## Git and Github Drills

Each driver should be working on their own local machine. When the driver changes, switch out the screenshare so that the new driver is sharing their screen. Do not stay keep focus on one person's machine throughout the assignment and just "hand over controls" when drivers change.

### Stage 1: Push and Pull

1. First driver begins:
    - Create a new local directory and add a `README.md` file
    - Initialize the local Github repository
        - `git init`
    - Create a Github repository on your own account called `test_repo`.
    - Follow [these instructions](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) to add a remote, commit, and push your repo to GitHub.
    - Add your partner's Github username as a collaborator on the repo at http://github.com/username/repo-name/settings/collaboration.

2. Second driver takes over:
    - Clone the shared repo
    - Add the text 'Hello my name is <your name>' to `README.md` and save
    - Check the status:
            - `git status`
    - Check the diff:
            - `git diff`
    - Add the file to the staging area
        - `git add .` or `git add <filename>` (Tip: use the tab)
    - Commit the staged changes
        - `git commit -m 'your message'`
    - Push the commit
        - `git push -u origin master`
    - Inspect the changes on gitHub

3. First driver:
    - Pull the code
    - Make another change to README.md
    - Check the diff `git diff` 
    - Revert your changes:
        - `git checkout -- <filename>`
        - **(NOTE: You need a space between the `--` and filename)**
    - `git status` - working tree should be clean
    - Make a different change, save, commit, push

4. Rinse and repeat a few times until you're comfortable with the process

## Stage 2: Merge Conflicts

5. First driver:
    - Pull the latest code
    - Create a new file: `index.html` 
    - Add boilerplate content for an HTML file.
    - *HINT:* Typing `!` and hitting `<tab>` will often create this snippet for you automatically in most code editors.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

</body>
</html>
```
6. Same (first) driver:
    - Add a line between the `<body>` tag: `<h1>My App with Styles</h1>`
    - Add this line between the `<meta>` and `<title>` tags: `<link rel="stylesheet" href="headers.css">`
    - Create a new file: `headers.css`
    - Add an `h1` style to the css file with your choice of a few attributes (e.g. change the font-size, color,...)
    - Perform the usual checks, then save, commit, push

7. Second driver:
    - Pull the code
    - Checkout to a new branch called "nav-styles":
        - `git checkout -b nav-styles` (we use `-b` to say "checkout AND create the branch"
    - Create a new file: `nav.css`
    - Add a style for `ul` elements that sets `list-style-type` to `none`
    - Modify the `index.html` so that it includes the new css file (you need to make an additional `<link>` tag)
    - To push the new branch, you'll need to change your `git push` command (do this AFTER the usual checks and commits):
        - `git push origin nav-styles`

8. First Driver:
    - Pull the latest `master` branch. Notice: nothing's changed! The last push was made to a different branch. You could pull this down, but let's assume this work wasn't finished yet and you need to start working on your own styles file!
    - Checkout to a new branch called "add-javascript"
    - Create a new file: `app.js`
    - On the first line, declare a `myTeam` variable set to a string with both your names.
    - Log out `myTeam` to the console.
    - Modify the `index.html` to include the new javascript file. This one goes right before the closing `</body>`:
        - `<script src="app.js"></script>`
    - Modify the `index.html` to change the `h1` text to: `<h1>My App with Styles and Scripts</h1>`
    - As above, commit all your changes, then push the new branch

9. Second Driver:
    - Time to merge back up with master! This one is going to be easy as `master` hasn't changed since you last checked out from it.
    - Make sure all your local changes are committed and up to date.
        - `git checkout master`
    - Let's make a quick intentional mistake:
        - `git branch -d nav-styles`
    - Notice git is smart enough to stop you deleting work. OK, let's merge it.
        - `git merge nav-styles`
    - Assuming all went well, we no longer need our `nav-styles` branch. It's served its purpose.
        - `git branch -d nav-styles`
    - Check status and push master to Github.

10. First Driver:
    - You're also ready to merge. It's a good practice after working on a branch to make sure you're synced with the Github repo.
        - `git checkout master`
        - `git pull origin master`
    - Uh oh, there have been changes! Well, we still need to merge our new code...
        - `git merge add-javascript`
    - Well, you got conflicts in your `index.html`! Open the file in your code editor and resolve them. You need to review the areas between `>>>>>> HEAD` and `<<<<<< add-javascript`. Looks like there's two versions of the `<h1>` and you'll need to resolve which one to keep! Keep only the line you want and then remove those ugly `<<<` and `>>>` marker lines to let git know you've resolved all conflicts.
    - Stage and commit your changes
    - Now try to merge again and all should be well
    - Delete your `add-javascript` branch. It's served its purpose.

For the final exercise, we're going to look at the core feature of Github as a collaboration tool: pull requests.

Whether you're working within a company on a propriety codebase or an open source project with hundreds of contributors, a good practice is to merge changes into an existing application through pull requests. They're kind of like remote merges.

11. First Driver
    - Create and checkout to a new branch, call it whatever you like.
    - Make a small change to an existing file or create a new file and add some content.
    - Commit the change and push the branch to Github. Remember to use the format `git push <repo> <branch>`
    - Go to the repo on Github.com and use the branch dropdown on the left to select your branch
    - Click "Create Pull Request" next to the dropdown
    - The next screen lets you add comments and gives you a nice graphical view of the changes you made
    - Submit the Pull Request

12. Second Driver
    - Go to the repo on Github.com and click on the Pull Requests tab
    - Here, you can review the changes and any comments.
    - You're satisfied to merge this branch to master, so Accept and Merge.
    - Locally, `git pull origin master` and you're once again good to checkout a new branch and keep developing!
    