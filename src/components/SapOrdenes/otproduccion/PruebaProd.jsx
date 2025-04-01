const payload = {
  "StartDate" : fechaProduccion,
  "ItemNo": "MP100018",
  "PlannedQuantity": produccion,
  "Series": "33",
  "Remarks": comentario,
  "ProductionOrderLines": [
      {       
           "StageID": 1,
          "PlannedQuantity": sacos,
          "ItemNo": "MP100001",
          "ProductionOrderIssueType": "im_Manual",
          "Warehouse": "Bodega01"
      },

  ],
"ProductionOrdersSalesOrderLines": [],
"ProductionOrdersStages": [
{
    "DocEntry": 28764,
    "StageID": 1,
    "SequenceNumber": 1,
    "StageEntry": 1,
    "Name": "MATERIALES"
    
},]
 
}