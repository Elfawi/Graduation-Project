// Option 1: Using CDN
console.log("hello supabase");

const sBase = supabase.createClient(
  "https://hppsxcchwmlccekexwxz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwcHN4Y2Nod21sY2Nla2V4d3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTY2MTgsImV4cCI6MjA1ODY3MjYxOH0.okkkJqWIapgQNW7qTG1lkGnrSGORD6Bvi-SXVmWxSRg"
);
console.log(sBase);
// Example of fetching courses
async function fetchCourses() {
  try {
    const { data, error } = await sBase.from("course").select("*");

    if (error) throw error;

    console.log("Courses:", data);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}
fetchCourses();
// Example of inserting a course
async function addCourse(courseName, description) {
  try {
    const { data, error } = await sBase
      .from("course")
      .insert([{ name: courseName, description: description }])
      .select();

    if (error) throw error;

    console.log("Added Course:", data);
    return data;
  } catch (error) {
    console.error("Error adding course:", error);
  }
}
// addCourse("MOT", "Fundamentals of Management of Technology");
async function fetchInstructors() {
  try {
    const { data, error } = await sBase.from("instructor").select("*");

    if (error) throw error;

    console.log("Instructors:", data);
    return data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return null;
  }
}

fetchInstructors();
// Function to insert a new instructor
async function insertInstructor(name, password) {
  try {
    // Validate input
    if (!name || !password) {
      throw new Error("Name and password are required");
    }

    // Check password length (matching CHAR(12) in database)
    if (password.length > 12) {
      throw new Error("Password must be 12 characters or less");
    }

    const { data, error } = await sBase
      .from("instructor")
      .insert([
        {
          name: name,
          password: password,
        },
      ])
      .select();

    if (error) throw error;

    console.log("Inserted Instructor:", data);
    return data;
  } catch (error) {
    console.error("Error inserting instructor:", error);
    return null;
  }
}
// insertInstructor("John Doe", "password123");
