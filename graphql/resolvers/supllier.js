const { Op, Barang, Supplier } = require('../../models')
const _ = require('lodash')

const supplier = async () => {
  try {
    const resultSupplier = await Supplier.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: {
        model: Barang,
        attributes: {
          exclude: ['harga_jual', 'createdAt', 'updatedAt']
        }
      }
    })

    let objectReturn = []
    resultSupplier.forEach(s => {
      let { dataValues, Barang } = s

      let object = {
        id: dataValues.id,
        nama: dataValues.nama,
        alias: dataValues.alias,
        telepon: dataValues.telepon,
        alamat: dataValues.alamat
      }

      objectReturn.push(object)
    });

    return objectReturn
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

    const supplier = await Supplier.create({
      nama: input.nama,
      alias: input.alias.toUpperCase(),
      telepon: input.telepon,
      alamat: input.alamat
    })

    const { dataValues } = await supplier.save()
    return dataValues
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

    const [numOfAffectedRow, updatedSupplier] = await Supplier.update(input, {
      where: {
        id: { [Op.eq]: id }
      },
      returning: true
    })
    if (!updatedSupplier) {
      throw new Error('failed to update Supplier please check your input')
    }

    const mergedUpdate = await _.merge(checkSupplier.dataValues, input)
    return mergedUpdate
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