const buildSchema = require('graphql')

module.exports = buildSchema(`
  schema {
    query: RootQuery,
    mutation: RootMutation
  }

  type RootQuery {
    barang: [Barang!]!
    karyawan: [Karyawan!]!
    supplier: [Supplier!]!
    cart: [Cart!]!
    order: [Order!]!
    satuan: [Satuan!]!
    kategori: [Kategori!]!
    login(username: String!, password: String!): AuthData!
  }

  type RootMutation {

  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExp: Int!
  }

  type Barang {
    _id: ID!
    nama: String!
    stok: Int!
    satuan: Satuan!
    kategori: Kategori!
    hargaBeli: Float!
    hargaJual: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Supplier {
    _id: ID!
    nama: String!
    telepon: String!
    alamat: String!
  }

  type Karyawan {
    _id: ID!
    nama: String!
    username: String!
    password: String
    email: String!
    jabatan: Jabatan!
  }

  type Jabatan {
    _id: ID!
    nama: String!
  }

  type Cart {
    _id: ID!
    cartKode: String!
    createdAt: String!
    updatedAt: String!
    total: Float!
    barang: [Barang!]!
  }

  type Order {
    _id: ID!
    cartKode: String!
    createdAt: String!
    updatedAt: String!
    total: Float!
    barang: [Barang!]!
  }

  type Satuan {
    _id: ID!
    nama: String!
  }

  type Kategori {
    _id: ID!
    nama: String!
  }

`)