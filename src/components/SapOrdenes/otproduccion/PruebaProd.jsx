const payload = {
    "StartDate" : fechaProduccion,
    "ItemNo": "MP100021",
    "PlannedQuantity": produccion,
    "Series": "81",
    "Remarks": comentario,
    "ProductionOrderLines": [
        {       
             "StageID": 1,
            "PlannedQuantity": libras,
            "ItemNo": "MP100020",
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