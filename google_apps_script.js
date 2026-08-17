/**
 * ==============================================================================
 * SK FOODS - B2B WHOLESALE CHICKEN & POULTRY ORDER RECEIVER (GOOGLE APPS SCRIPT)
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      if (e.parameter.payload) {
        data = JSON.parse(e.parameter.payload);
      } else {
        data = e.parameter;
      }
    }

    // Fixed Information Columns
    var fixedHeaders = [
      "Order Date & Time",
      "Hotel / Restaurant Name",
      "Business Type",
      "Contact Person",
      "Phone / WhatsApp",
      "Delivery Area / Address",
      "Required Delivery Slot",
      "Cutting Style Preference"
    ];

    // Dynamic 10 Item Columns
    var itemKeys = Object.keys(data.items || {});
    
    // Summary & Total Columns
    var trailingHeaders = [
      "Ordered Items Summary",
      "Total Weight / Units Ordered",
      "Special Notes / Instructions"
    ];

    // Check existing headers in Row 1
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var existingHeaders = [];

    if (lastRow > 0 && lastColumn > 0) {
      existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    }

    // Build complete header list
    var completeHeaders = [].concat(fixedHeaders);
    
    itemKeys.forEach(function(key) {
      if (completeHeaders.indexOf(key) === -1) {
        completeHeaders.push(key);
      }
    });

    trailingHeaders.forEach(function(h) {
      if (completeHeaders.indexOf(h) === -1) {
        completeHeaders.push(h);
      }
    });

    // If headers don't exist, create Row 1 headers with styling
    if (existingHeaders.length === 0) {
      sheet.getRange(1, 1, 1, completeHeaders.length).setValues([completeHeaders]);
      sheet.getRange(1, 1, 1, completeHeaders.length)
        .setBackground("#0f172a")
        .setFontColor("#ffffff")
        .setFontWeight("bold")
        .setFontFamily("Arial");
      sheet.setFrozenRows(1);
      existingHeaders = completeHeaders;
    } else {
      // Check if any missing item columns need to be appended
      itemKeys.forEach(function(key) {
        if (existingHeaders.indexOf(key) === -1) {
          var insertIdx = existingHeaders.indexOf("Ordered Items Summary");
          if (insertIdx === -1) insertIdx = existingHeaders.length;
          sheet.insertColumnBefore(insertIdx + 1);
          sheet.getRange(1, insertIdx + 1).setValue(key)
            .setBackground("#0f172a")
            .setFontColor("#ffffff")
            .setFontWeight("bold");
          existingHeaders.splice(insertIdx, 0, key);
        }
      });
    }

    // Map order values to headers
    var newRow = existingHeaders.map(function(header) {
      switch(header) {
        case "Order Date & Time":
          return data.timestamp || Utilities.formatDate(new Date(), "GMT+5:30", "dd/MM/yyyy HH:mm:ss");
        case "Hotel / Restaurant Name":
          return data.hotelName || "";
        case "Business Type":
          return data.hotelType || "";
        case "Contact Person":
          return data.contactPerson || "";
        case "Phone / WhatsApp":
          return "'" + (data.phone || "");
        case "Delivery Area / Address":
          return data.address || "";
        case "Required Delivery Slot":
          return data.deliverySlot || "";
        case "Cutting Style Preference":
          return data.cuttingStyle || "";
        case "Ordered Items Summary":
          return data.itemsSummary || "";
        case "Total Weight / Units Ordered":
          return data.totalUnits || "";
        case "Special Notes / Instructions":
          return data.notes || "-";
        default:
          if (data.items && data.items.hasOwnProperty(header)) {
            var qty = data.items[header];
            return (qty !== undefined && qty !== null && qty !== "" && qty !== "0") ? qty : "0";
          }
          return "-";
      }
    });

    // Write to Google Sheet
    sheet.appendRow(newRow);

    var newLastRow = sheet.getLastRow();
    sheet.getRange(newLastRow, 1, 1, newRow.length)
      .setFontFamily("Arial")
      .setFontSize(10)
      .setVerticalAlignment("middle");

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Order successfully saved to Google Sheet!",
      rowNumber: newLastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "SK Foods Wholesale Poultry Order Webhook",
    time: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
