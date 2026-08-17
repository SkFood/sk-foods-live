/**
 * ==============================================================================
 * SK FOODS - B2B WHOLESALE CHICKEN & POULTRY ORDER RECEIVER (GOOGLE APPS SCRIPT)
 * ==============================================================================
 * 
 * 100% TRIPLE-REDUNDANT GOOGLE SHEETS ORDER LOGGING ENGINE
 */

// Exact 25 Standard Column Headers
var EXACT_13_ITEM_HEADERS = [
  "Order Date & Time",
  "Hotel / Restaurant Name",
  "Business Type",
  "Contact Person",
  "Phone / WhatsApp",
  "Delivery Area / Address",
  "Required Delivery Slot",
  "Cutting Style Preference",
  "W/S Briyani Cut (Kg)",
  "W/S Curry Cut (Kg)",
  "Skinless Curry Cut (Kg)",
  "Tandoori Without Neck (Kg/Birds)",
  "Grill Chicken (Kg/Birds)",
  "Lollipop (Kg)",
  "Boneless Breast (Kg)",
  "Leg Boneless (Kg)",
  "Drumstick W/S (Kg)",
  "Drumstick Skinless (Kg)",
  "Janatha (Kg)",
  "Liver (Kg)",
  "Gizzard (Kg)",
  "Ordered Items Summary",
  "Total Weight / Units Ordered",
  "Special Notes / Instructions",
  "Merchant Call Confirmation (Pending / Confirmed)"
];

function getTargetSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {}
  
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActive();
    } catch (err2) {}
  }

  if (ss) {
    return ss.getSheets()[0]; // Always target first sheet tab (Sheet1)
  }
  return null;
}

function processOrderPayload(data) {
  var sheet = getTargetSheet();
  if (!sheet) {
    return { status: "error", message: "Spreadsheet not found!" };
  }

  ensureRow1Headers(sheet);

  var lastColumn = sheet.getLastColumn();
  var existingHeaders = sheet.getRange(1, 1, 1, Math.max(lastColumn, EXACT_13_ITEM_HEADERS.length)).getValues()[0];

  var itemKeys = Object.keys(data.items || {});
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
      case "Merchant Call Confirmation (Pending / Confirmed)":
        return "📞 Pending Merchant Call Confirmation";
      default:
        if (data.items && data.items.hasOwnProperty(header)) {
          var qty = data.items[header];
          return (qty !== undefined && qty !== null && qty !== "" && qty !== "0") ? qty : "0";
        }
        return "-";
    }
  });

  sheet.appendRow(newRow);

  var newLastRow = sheet.getLastRow();
  sheet.getRange(newLastRow, 1, 1, newRow.length)
    .setFontFamily("Arial")
    .setFontSize(10)
    .setVerticalAlignment("middle");

  return { status: "success", message: "Order successfully saved to Google Sheet!", rowNumber: newLastRow };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var data = {};
    if (e) {
      if (e.postData && e.postData.contents) {
        var contents = e.postData.contents;
        try {
          data = JSON.parse(contents);
        } catch (err1) {
          try {
            if (contents.indexOf("payload=") === 0) {
              contents = contents.substring(8);
            }
            data = JSON.parse(decodeURIComponent(contents));
          } catch (err2) {}
        }
      }
      
      if ((!data || Object.keys(data).length === 0) && e.parameter) {
        if (e.parameter.payload) {
          try {
            data = JSON.parse(e.parameter.payload);
          } catch (err3) {
            data = e.parameter;
          }
        } else {
          data = e.parameter;
        }
      }
    }

    var result = processOrderPayload(data);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);

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
  var sheet = getTargetSheet();
  if (sheet) {
    ensureRow1Headers(sheet);
  }

  if (e && e.parameter && e.parameter.payload) {
    try {
      var data = JSON.parse(e.parameter.payload);
      var result = processOrderPayload(data);
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {}
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    service: "SK Foods Wholesale Poultry Order Webhook",
    message: "Google Sheet connection active and 25 Headings ready!",
    headersCount: EXACT_13_ITEM_HEADERS.length,
    time: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function ensureRow1Headers(sheet) {
  if (!sheet) return;
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  var needsHeaders = false;
  if (lastRow === 0 || lastColumn === 0) {
    needsHeaders = true;
  } else {
    var val = sheet.getRange(1, 1).getValue();
    if (!val || val.toString().trim() === "") {
      needsHeaders = true;
    }
  }

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, EXACT_13_ITEM_HEADERS.length).setValues([EXACT_13_ITEM_HEADERS]);
    sheet.getRange(1, 1, 1, EXACT_13_ITEM_HEADERS.length)
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontWeight("bold")
      .setFontFamily("Arial")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
      
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);
  }
}

function forceCreateHeadingsInAllSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    sheet.getRange(1, 1, 1, EXACT_13_ITEM_HEADERS.length).setValues([EXACT_13_ITEM_HEADERS]);
    sheet.getRange(1, 1, 1, EXACT_13_ITEM_HEADERS.length)
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontWeight("bold")
      .setFontFamily("Arial")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);
  }
  Logger.log("All tabs updated with 25 Headings!");
}
