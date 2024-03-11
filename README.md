# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/nickoff/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Running application

Create an ```.env``` file based on the ```.env.example``` file (PORT=4000)

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Endpoints

 * `GET /user` - get all users
 * `POST /user` - create user (following DTO should be used)
      `CreateUserDto`
      ```typescript
          interface CreateUserDto {
            login: string;
            password: string;
          }
      ```
 * `PUT /user/:id` - update user's password
      `UpdatePasswordDto` (with attributes):
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
      }
      ```
 * `DELETE /user/:id` - delete user
 * `GET /track` - get all tracks
 * `GET /track/:id` - get single track by id
 * `POST /track` - create new track
 * `PUT /track/:id` - update track info
 * `DELETE /track/:id` - delete track
 * `GET /artist` - get all artists
 * `GET /artist/:id` - get single artist by id
 * `POST /artist` - create new artist
 * `PUT /artist/:id` - update artist info
 * `DELETE /artist/:id` - delete album
 * `GET /album` - get all albums
 * `GET /album/:id` - get single album by id
 * `POST /album` - create new album
 * `PUT /album/:id` - update album info
 * `DELETE /album/:id` - delete album
 * `GET /favs` - get all favorites
      ```typescript
      interface FavoritesResponse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
 * `POST /favs/track/:id` - add track to the favorites
 * `DELETE /favs/track/:id` - delete track from favorites
 * `POST /favs/album/:id` - add album to the favorites
 * `DELETE /favs/album/:id` - delete album from favorites
 * `POST /favs/artist/:id` - add artist to the favorites
 * `DELETE /favs/artist/:id` - delete artist from favorites


## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
