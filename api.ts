import { Application, Router } from "https://deno.land/x/oak/mod.ts";

interface Course {
    name: String;
    price: number;
    certification: boolean;
}

let courses: Array<Course> = [
    {
        name: "C++ Bootcamp",
        price: 199,
        certification: true
    }, {
        name: "MERN Bootcamp",
        price: 199,
        certification: true
    }, {
        name: "IOS Crash Course",
        price: 99,
        certification: false
    }, {
        name: "React Bootcamp",
        price: 299,
        certification: true
    }
]


export const getCourses = ({ response }: { response: any }) => {
    response.body = courses;
}

export const addCourses = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body;
    const course: Course = body.value;

    courses.push(course);
    response.body = { courseAdded: "SUCCESS" };
    response.status(200);
}

const router = new Router();
const PORT = 4300;
const app = new Application();

router
    .get("/learn", getCourses)
    .post("/create", addCourses)

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });