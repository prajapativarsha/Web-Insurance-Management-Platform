const prisma = require("../config/prisma");

// const createEmployee = async (data) => {
//   return await prisma.agents.create({
//     data,
//   });
// };

const createEmployee = async (data) => {
  return await prisma.$transaction(async (tx) => {
    
    // 1. Find the most recently created agent to get the latest code
    const lastAgent = await tx.agents.findFirst({
      orderBy: {
        id: 'desc', 
      },
    });

    // 2. Determine the next sequence number
    let nextNumber = 1; // Default to 1 if this is the very first employee
    
    if (lastAgent && lastAgent.employee_code) {
      // Remove the "EMP-" prefix to isolate the number (e.g., "EMP-000042" -> "000042")
      const lastCodeString = lastAgent.employee_code.replace('EMP-', '');
      
      // Parse it into a standard integer and add 1
      const lastCode = parseInt(lastCodeString, 10);
      if (!isNaN(lastCode)) {
        nextNumber = lastCode + 1;
      }
    }

    // 3. Format the new code with the "EMP-" prefix and 6 padded zeros
    const generatedEmployeeCode = `EMP-${String(nextNumber).padStart(6, '0')}`;

    // 4. Create the new agent with the auto-generated code
    const newEmployee = await tx.agents.create({
      data: {
        ...data,
        employee_code: generatedEmployeeCode,
      },
    });

    // 5. Update the parent user's role to 'agent'
    await tx.users.update({
      where: {
        id: data.user_id,
      },
      data: {
        role: "agent",
      },
    });

    return newEmployee;
  });
};

const getEmployeeList = async (searchQuery = "") => {
  const employees = await prisma.agents.findMany({
    where: {
      OR: [
        {
          users: {
            name: { contains: searchQuery, mode: "insensitive" },
          },
        },
        {
          users: {
            email: { contains: searchQuery, mode: "insensitive" },
          },
        },
      ],
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          is_active: true,
        },
      },
    },
  });
  return employees;
};

const getEmployee = async (id) => {
  const employee = await prisma.agents.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      users: {
        select: { name: true, email: true, phone: true, is_active: true },
      },
    },
  });

  return employee;
};

const updateEmployee = async (id, data) => {
  return await prisma.agents.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deactivateEmployee = async (id) => {
  // First, find the customer to get their linked user_id
  const employee = await prisma.agents.findUnique({
    where: { id: Number(id) },
    select: { user_id: true },
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  // Soft delete by deactivating the parent user account
  return await prisma.agents.update({
    where: {
      id: employee.user_id,
    },
    data: {
      is_active: false,
    },
  });
};

module.exports = {
  createEmployee,
  getEmployeeList,
  getEmployee,
  updateEmployee,
  deactivateEmployee,
};
