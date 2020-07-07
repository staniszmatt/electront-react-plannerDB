import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postCustomerNote from './postCustomerNote';
import postNewChangeNote from './postChangeNote';
import isObjEmpty from '../helpFunctions/isObjEmpty';

async function updateCustomer(request) {
  let returnData = {
    error: {}
  };

  let requestList = '';

  const modifyRequest = {
    customerGenStd: request.customerGenStd,
    customerActive: request.customerActive,
    customerRsStd: request.customerRsStd,
    customerCodeName: request.customerCodeName
  };

  const dbRequest = {};
  // Load only non-null values into new object
  Object.keys(modifyRequest).map(key => {
    if (modifyRequest[key] !== null) {
      dbRequest[key] = modifyRequest[key];
    }
  });
  // Setup string of key values to pass to the query string
  Object.keys(dbRequest).map((key, index) => {
    const keyLastIndex = Object.keys(dbRequest).length - 1;
    if (index !== keyLastIndex) {
      requestList += `${key} = '${dbRequest[key]}', `;
    } else {
      // Remove comma on last indexed key for query
      requestList += `${key} = '${modifyRequest[key]}'`;
    }
  });

  // Updated new customer
  try {
    const db = await pool.connect();
    const query = `UPDATE customer
      SET ${requestList}
        WHERE customerName = '${request.customerName}'`;

    const data = await db.query(query);

    // If customer add worked, then create the change note to show when customer was created
    if (data.rowsAffected[0] === 1) {
      returnData.newCustomer = {
        success: 'Success',
        updatedCustomerData: data
      };
    } else {
      returnData = {
        success: 'Failed to update customer!',
        updatedCustomerData: data,
        error: {
          empty: `Something went wrong on updating customer`
        }
      };
    }
    return returnData;
  } catch (err) {
    returnData = {
      error: err
    };
    return returnData;
  }
}

module.exports = updateCustomer;
