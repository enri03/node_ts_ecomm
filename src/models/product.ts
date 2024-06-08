import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Product extends Model {
  public id?: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stockQuantity?: number;
  public category?: string;
}

export const ProductMap = (sequelize: Sequelize) => {
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: 0
    },
    category: {
      type: DataTypes.STRING(255), 
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true
  });

  Product.sync(); // This will create the table if it doesn't exist
};