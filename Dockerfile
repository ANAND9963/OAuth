# Step 1: Use an official Node.js image as a parent image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install the application dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 5000

# Step 7: Define the command to run your app
CMD ["npm", "run", "start"]
