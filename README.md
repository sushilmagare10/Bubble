
Complete overview of a modern social media app built for great user experience, performance, and scalability. It uses a solid stack of current web technologies and offers essential features like user authentication, profile management, content sharing (posts and stories), and social interaction.


## Demo
https://bubble-bay.vercel.app/

## Key Technologies Used

- Authentication: **Clerk** is used for secure and smooth user authentication — handling sign-up, login, and session management.
- Database/ORM: **Prisma** is used as the ORM, working with **Neon**, a serverless PostgreSQL platform, to provide scalable database access.
- Cloud Storage: **Cloudinary** handles media storage and delivery (profile pictures, post images/videos, story content), with optimization built in.
- UI Components: **Shadcn/ui** offers well-designed and accessible UI components for a polished interface.
- Backend Logic: Server Actions from Next.js are used for handling data operations on the server directly from components.
- User Provisioning: Clerk Webhooks ensure that users are automatically added to the database (Prisma + Neon) after signing up.

## Core Features

**User Authentication**
- Sign-up and login using Clerk.
- Secure session management.
- Supports multiple sign-in methods (email/password, social logins).

**Profile Management**
- Users can manage their profile photo, cover photo, bio, and other personal info.
- Profile editing is available to the owner.
- Others can follow or block the user.

**Content Posting**
- Users can share posts with text and media (uploaded via Cloudinary).
- Posts show up in profile feeds and can be liked or commented on.

**Post Interactions**
- Users can like and comment on posts.
- Real-time updates to like and comment counts.
- Users receive notifications when someone likes or comments on their post, keeping them engaged.
- Typically implemented using WebSockets and server-side logic to track changes in the database.

**Stories**
- Users can post temporary stories (images or videos) that disappear after a set time.

**Social Connections**
- Users can search for and connect with others.
- Follow/unfollow functionality.

**Light and Dark Mode**
- App supports both light and dark themes.
- Users can toggle between themes for comfort and accessibility.
