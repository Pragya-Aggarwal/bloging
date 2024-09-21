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










