# Run the cld cloudinary CLI tool, we need to read from the .env file for the cloudinary credentials
# We need to run this script from the root of the project
export $(cat .env | xargs)
cld upload_dir images
