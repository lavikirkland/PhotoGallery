# PhotoGallery
## Frameworks
- Frontend: Javascript + React.js
- Backend:
    - Server: Python3 + Django
    - Database: Django ORM for image metadata and AWS S3 for image file storage
## Start
- Backend: 
```
    cd ~/PhotoGallery
    python manage.py runserver
```
- Frontend: 
```
    cd ~/PhotoGallery/frontend
    npm install
    npm start
```

## Specification 
- Backend:
    - has 3 REST API definition:
        1. GET /api/photos?page=:pageNum => get all photos
        2. GET /api/photos/:photoId => get single photo
        3. PUT /api/photos/:photoId => annotate photo metadata
            - ```
                reqBody: {
                    theme: string,
                    tagged: boolean,
                    flagged: boolean,
                }
            ```
    - AWS S3 for image file storage
- UI:    
    <https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/PhotoGallery1.png>     
    <https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/PhotoGallery2.png>     
    <img src="https://photogallerystorage.s3-us-west-1.amazonaws.com/static/media/PhotoGallery2.png" alt="PhotoGallery2"/>

## TODO
1. Modify AWS S3 Permission Rules
2. Add more API path and functionality
3. UI animation 