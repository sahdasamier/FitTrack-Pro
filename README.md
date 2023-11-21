# MR-
you should add a .env file and write the like to your Mongo Atlas and the port you will run in it 
like this 
PORT=4000
MONGO_URI=mongodb+srv://sahdasamier:ewI55nt5T8Le1rOI@cluster0.4za5kba.mongodb.net/?retryWrites=true&w=majority
and don't forget to make installation related to the backend in the backend folder itself 
through 
#cd backend or any name you put your backend files and folders in 



& if you face any problem related to the installation like if all folders related to package you install 
add to your git-hub or in source control please follow the steps : 
Add node_modules to .gitignore:

Open the .gitignore file in a text editor and add the following line:
Copy code
node_modules/
This line tells Git to ignore the node_modules directory.
Commit .gitignore:

After saving the .gitignore file, commit it to your repository:
bash
Copy code
git add .gitignore
git commit -m "Add .gitignore with node_modules"
Push to GitHub:

Push your changes to GitHub:
bash
Copy code
git push origin main
