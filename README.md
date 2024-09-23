# bloging

Basic Git Commands
1. Initialize a Repository: git init
2. Make a Commit: git add .
    git commit -m "Initial commit"
3. Push to GitHub: git remote add origin https://github.com/Pragya-Aggarwal/bloging.git
git push -u origin main

Branching Strategy
GitFlow:

1. Main branches: main, develop
2. Feature branches for new features: feature/<feature-name>
3. Release branches for preparing releases: release/<version>
4. Hotfix branches for urgent fixes: hotfix/<issue>

To implement it:

1. Start with develop branch.
2. Create a feature branch: git checkout -b feature/new-feature

3. Merge into develop once complete: git checkout develop
git merge feature/new-feature


Merging and Resolving Conflicts

1.  Merge the Feature Branch
Try to merge the feature branch into the main branch. For example:
git pull origin <main branch>

2.  Check the Conflict
git status

3. You’ll see a list of files with conflicts. Open one of those files in your text editor, and you’ll see conflict markers that look like this:
<<<<<< HEAD
This is the code from the feature branch.
=======
This is the code from the feature branch.
>>>>>>> feature/new-feature

select any one option -
   - Accept Current Change  
   - Accept Incoming Change
   - Accept Both Changes  
   - Compare Changes
       
4. Add the Resolved Files
   git add .
   
6.  Commit the Merge
git commit -m "comment"

7. Push the Merged Changes
git push origin <Branch>
   







