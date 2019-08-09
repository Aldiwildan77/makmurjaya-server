const { Supplier } = require('../../models')
const { generateId } = require('../../helpers/generateId')

const supplier = async () => {
  try {

  } catch (error) {
    throw error
  }
}

const addSupplier = async ({ input }, context) => {
  if (!context.scope.includes('supplierGrant')) throw new Error('Permission denied')

  try {
    const checkSupplier = await Supplier.findOne({ where: { alias: input.alias.toUpperCase() } })
    if (checkSupplier) {
      throw new Error('Supplier already exist')
    }

    const Supplier = await Supplier.create({
      id: generateId('S'),
      nama: input.nama,
      alias: input.alias.toUpperCase(),
      telepon: input.telepon,
      alamat: input.alamat
    })

    const { dataValues } = await Supplier.save()
    return {
      id: dataValues.id,
      nama: dataValues.nama,
      alias: dataValues.alias,
      telepon: dataValues.telepon,
      alamat: dataValues.alamat
    }
  } catch (error) {
    throw error
  }
}

const updateSupplier = async ({ id, input }, context) => {
  if (!context.scope.includes('supplierGrant')) throw new Error('Permission denied')

  try {
    const checkSupplier = await Supplier.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkSupplier) {
      throw new Error('those Supplier isn\'t exist')
    }

    const update = {
      id: id,
      nama: input.nama,
      alias: dataValues.alias,
      telepon: dataValues.telepon,
      alamat: dataValues.alamat
    }

    const [numOfAffectedRow, updatedSupplier] = await Supplier.update(update, {
      where: {
        id: { [Op.eq]: id }
      },
      returning: true
    })
    if (!updatedSupplier) {
      throw new Error('failed to update Supplier please check your input')
    }

    return { ...update }
  } catch (error) {
    throw error
  }
}

const deleteSupplier = async ({ id }, context) => {
  if (!context.scope.includes('supplierGrant')) throw new Error('Permission denied')

  try {
    const checkSupplier = await Supplier.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkSupplier) {
      throw new Error('those Supplier isn\'t exist')
    }

    const deletedSupplier = await Supplier.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedSupplier) {
      throw new Error('unable to delete Supplier, please check the relation')
    }

    return `Supplier ${checkSupplier.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

module.exports = { supplier, addSupplier, updateSupplier, deleteSupplier }