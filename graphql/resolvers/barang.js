const { Op, Barang } = require('../../models')
const _ = require('lodash')

const barang = async () => {
  try {
    const result = await Barang.findAll()
    return result.map(res => {
      return {
        ...res.dataValues
      }
    })
  } catch (error) {
    throw error
  }
}

const addBarang = async ({ input }, context) => {
  if (!context.scope.includes('barangGrant')) throw new Error('Permission denied')

  if (input.stok < 0 || input.harga_beli < 0 || input.harga_jual < 0) {
    throw new Error('Negative value isn\'t valid, please change your input')
  }

  try {
    const checkBarang = await Barang.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {
        [Op.and]: [
          { nama: { [Op.like]: input.nama } },
          { supplier_id: { [Op.eq]: input.supplier_id } },
          { kategori_id: { [Op.eq]: input.kategori_id } },
          { satuan_id: { [Op.eq]: input.satuan_id } }
        ]
      }
    })
    if (checkBarang) {
      throw new Error('Barang already exist')
    }

    const barang = await Barang.create(input)
    const { dataValues } = await barang.save()

    return dataValues
  } catch (error) {
    throw error
  }
}

const updateBarang = async ({ id, input }) => {
  if (!context.scope.includes('barangGrant')) throw new Error('Permission denied')

  try {
    const checkBarang = await Barang.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkBarang) {
      throw new Error('Those Barang isn\'t exist')
    }

    const [numOfAffectedRow, updatedBarang] = await Barang.update(input, {
      where: {
        id: {
          [Op.eq]: id
        }
      },
      returning: true
    })
    if (!updatedBarang) {
      throw new Error('Failed to update Barang please check your input')
    }

    const mergedUpdate = await _.merge(checkBarang.dataValues, input)
    return mergedUpdate
  } catch (error) {
    throw error
  }
}

const deleteBarang = async ({ id }) => {
  if (!context.scope.includes('barangGrant')) throw new Error('Permission denied')

  try {
    const checkBarang = await Barang.findOne({ where: { id: { [Op.eq]: id } } })
    if (!checkBarang) {
      throw new Error('Those Barang isn\'t exist')
    }

    const deletedBarang = await Barang.destroy({ where: { id: { [Op.eq]: id } } })
    if (!deletedBarang) {
      throw new Error('Unable to delete Barang, please check the relation')
    }

    return `Barang ${checkBarang.dataValues.nama} has been deleted`
  } catch (error) {
    throw error
  }
}

const stokBarang = async ({ id, stok }, context) => {
  if (!context.scope.includes('stokGrant')) throw new Error('Permission denied')

  if (stok < 0) {
    throw new Error('Negative value isn\'t valid, please change your input')
  }

  try {
    const checkBarang = await Barang.findByPk(id)
    if (!checkBarang) {
      throw new Error('Those Barang isn\'t exist')
    }

    const incrementStock = await checkBarang.increment('stok', { by: stok })
    if (!incrementStock) {
      throw new Error('Failed to update stok, please check your input')
    }

    stok += checkBarang.dataValues.stok
    const mergedUpdate = _.merge(checkBarang.dataValues, { 'stok': stok })
    return mergedUpdate
  } catch (error) {
    throw error
  }
}


module.exports = { barang, addBarang, updateBarang, deleteBarang, stokBarang }