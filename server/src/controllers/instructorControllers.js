const { Instructor } = require("../db");

const getInstructors = async () => {
  try {
    //Hacemos la consulta para traer la data
    const instructors = await Instructor.findAll();
    
    return instructors;
  } catch (error) {
    throw new Error(error.message);
  }
};


// En este controller creamos un instructor en el Gym.
const createInstructorController = async (fullname, photo, description) => {
  try {
    const instrutorExists = await Instructor.findOne({
      where: {
        fullname: fullname,
      },
    });

    if (instrutorExists) {
      throw new Error("Ya existe un instructor con ese nombre.");
    }

    const newInstructor = await Instructor.create({
      fullname,
      photo,
      description,
    });

    return {
      message: "Instructor creado exitosamente.",
      instructor: newInstructor,
    };
  } catch (error) {
    throw new Error(`Error al crear el instructor: ${error.message}`);
  }
};

// Este controller permite actualizar un instructor para que lo desactive o active si es necesario o lo convierta en administrador de la pagina.
const updateInstructorController = async (id, newDta) => {
  try {
    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      throw new Error("Instructor no encontrado.");
    }
    // Actualizamos la información del instructor.
    await instructor.update(newDta);
    const allInstructors = await Instructor.findAll();

    return {
      message: "Instructor actualizado exitosamente.",
      instructors: allInstructors,
    };
  } catch (error) {
    throw new Error(`Error al actualizar el instructor: ${error.message}`);
  }
};

const deleteInstructors= async (id) => {
    try {
      const instructors = await Instructor.findByPk(id);
      await instructors.destroy();
      return { message: "Instructor deleted successfully" };
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
module.exports = {
    createInstructorController,
    updateInstructorController,
    getInstructors,
    deleteInstructors
};
