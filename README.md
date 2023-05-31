# About
[Deployed Here](https://chirp-larasify.vercel.app/)

This was created as a learning excercise following Theo(t3.gg)'s stack tutorial. Was my first attempt at Next/React/Serverless and a bunch of other techs.
 
Deployed using vercel, planetscale, axiom, clerk and upstash

# TODO
- [] static navigation menu on left side
- [] gmail login use first name
- [] infinite scrolling with hybrid loading
- [] character count left to post and that cute ring thing twitter has
- [x] clickable cards to go to post 
- [x] back button on profile and post
- [x] scrolling anywhere to scroll only inside [ ] (it is done but its not the most elegant solution)
- [] tailwind add utility to hidde scrollbar
- [x] sticky footer pre render before any data is fetched
- [] sign out button
- [] move CI from vercel to github
- [] When hovered over pfp and username it should show link
- [] When a new post comes it should animate nicely
- [x] fix the blocking on clicking profile etc it should change instantly with a loading spinner (removing trpc ssg and dehydrate and adding a page layout to the loading screen so it pre renders it for posts and profile so the user gets it instantly as html and then it fetches the data and hydrates it, did it on posts as example. ig this is better if the page wasn't cached anywhere so cold starts block more but slower if it was already accessed recently)
- [x] back button should only go back up to the previous page not back to the home page
- [] profile descriptions and an edit button that only shows on your own profile, also relations with posts

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
