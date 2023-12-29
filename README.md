# AI-TICULATE

## Description
AI-TICULATE is a game where you play charades against an AI. The AI will try to guess what you are acting out. The AI is trained using a neural network. //TODO: add more description

## Authors
- Liam Quinn
- Kyle Albert

## Client
### Setup
1. Install the dependencies
   ```bash
    npm install 
   ```
2. Run the client in development mode on http://localhost:5173
   ```bash
    npm run dev
   ```

## Server
### Installation
1. Install the dependencies
   ```bash
    npm install 
   ```
2. Create a .env file and copy the contents of .env.example into it.
3.  Run the server in development mode on http://localhost:80
   ```bash
    npm run dev
   ```

## Git commands
#### When looking at main
- `git pull` this will pull the latest changes made on the main branch, merge and commit on your local
#### Making a new branch 
Two ways to make a new branch
- `git branch "name of your branch"` This will create the branch locally for you *note the quotations are not required and the branch name must have no spaces.*
- `git checkout "name of your branch"` This will checkout the branch
OR
- `git checkout -b "name of your branch" This will create the branch locally and then checkout that branch
#### Stash changes
- `git stash` This will store the changes in a heap which you can get back anytime
- `git stash pop` This will give you the latest changes that were stashed *note can be called recusivily* 
#### Making a commit 
First check the status of your files
- `git status` this will show you the files you have changed. They will be red if they are not stagged and green if they are stagged
- `git add -p` This will show you each file and the changes that have occured, you can say yes or no if you want to stage these changes. *note that new files will not be included*
- `git add .` This will stage all your changes  
- `git commit -m "your message here"` This will commit the staged changes to your local branch. Your commit message must be in quotes *note that if you miss out your -m "message" then you will end up in what ever your default text editor is (maybe vim) and sometimes hard to get out*
#### Pushing to remote repo
###### First time pushing to a remote origin
- `git push -u origin name-of-your-branch` this will set a upstream to the remote branch which most likely doesnt exist so will also create one.
###### Second time pushing to a remote origin
- `git push` this can be used onces an up stream to the remote branch has been established
- `git push --force-with-lease` This maybe required at times when others have cloned your branch
