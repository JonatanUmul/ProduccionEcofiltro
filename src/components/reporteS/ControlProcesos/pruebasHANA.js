// SELECT 
//     T0."DocEntry",
//     T2."SlpName"        AS "Vendedor",
//     T0."U_FE_Res"       AS "Resolucion",
//     T6."Serie"          AS "Serie",
//     T1."Dscription"     AS "Detalle producto",
//     T0."DocDate"        AS "Fecha Factura",
//     T0."U_DocNom"       AS "Nombre de Factura",
//     T0."U_FacNit"       AS "NIT",
//     T0."U_Direccion"    AS "Dirección de Factura",
//     T0."TaxDate"        AS "Fecha Contabilización",
//     T0."NumAtCard"      AS "Número/Serie Doc",
//     T1."ItemCode",
//     T1."VatSum",
//     T1."GTotal",
//     T1."Quantity",
//     T1."LineTotal",
//     CASE WHEN T1."Quantity" = 0 THEN T1."LineTotal"
//          ELSE T1."LineTotal"/T1."Quantity" END AS "Precio",
//     T3."WhsName"        AS "Nombre Bodega",

//     /* ===== Pagos recibidos (resumen por factura) ===== */
//     MP."Cobrador",
//     MP."SerieRecibo",
//     MP."PagosAplicados",
//     MP."PrimeraFechaPago",
//     MP."UltimaFechaPago",
//     MP."Efectivo",
//     N_EF."CuentaEfectivo",           -- 11101003 - Caja...
//     MP."Transferencia",
//     N_TR."CuentaTransferencia",      -- …
//     MP."Cheques",
//     N_CH."CuentaCheques",            -- …
//     MP."Tarjeta",
//     N_CC."CuentasTarjeta",           -- …
//     MP."TotalAplicado"

// FROM OINV T0
// JOIN INV1 T1  ON T1."DocEntry" = T0."DocEntry" AND T0."DocType" = 'I'
// JOIN OSLP T2  ON T2."SlpCode"  = T0."SlpCode"
// JOIN OWHS T3  ON T3."WhsCode"  = T1."WhsCode"

// -- ===== Series (factura 13 + entrega ligada 15) =====
// LEFT JOIN (
//     SELECT DISTINCT
//         S."BaseEntry"   AS "DocEntry",
//         S."BaseLinNum"  AS "LineNum",
//         R0."IntrSerial" AS "Serie"
//     FROM SRI1 S
//     JOIN OSRN R1 ON R1."ItemCode" = S."ItemCode" AND R1."SysNumber" = S."SysSerial"
//     JOIN OSRI R0 ON R0."ItemCode" = R1."ItemCode" AND R0."IntrSerial" = R1."DistNumber"
//     WHERE S."BaseType" = '13' AND S."Direction" = '1'
//     UNION
//     SELECT DISTINCT
//         D1."BaseEntry"  AS "DocEntry",
//         D1."BaseLine"   AS "LineNum",
//         R0."IntrSerial" AS "Serie"
//     FROM DLN1 D1
//     JOIN SRI1 S ON S."ItemCode"   = D1."ItemCode"
//                AND S."BaseType"   = '15'
//                AND S."BaseEntry"  = D1."DocEntry"
//                AND S."BaseLinNum" = D1."LineNum"
//                AND S."Direction"  = '1'
//     JOIN OSRN R1 ON R1."ItemCode" = S."ItemCode" AND R1."SysNumber" = S."SysSerial"
//     JOIN OSRI R0 ON R0."ItemCode" = R1."ItemCode" AND R0."IntrSerial" = R1."DistNumber"
//     WHERE D1."BaseType" = '13'
// ) T6
//   ON T6."DocEntry" = T0."DocEntry"
//  AND T6."LineNum"  = T1."LineNum"

// -- ===== Pagos (ORCT/RCT2) prorrateados por factura (importes) =====
// LEFT JOIN (
//     SELECT
//         R2."DocEntry"                                        AS "InvDocEntry",
//         STRING_AGG(TO_NVARCHAR(P."DocNum"), ', ')            AS "PagosAplicados",
//         MIN(P."DocDate")                                     AS "PrimeraFechaPago",
//         MAX(P."DocDate")                                     AS "UltimaFechaPago",
//         MAX(P."U_Cobrador")                                     AS "Cobrador",
//         MAX(P."U_SerieRecibo")                                     AS "SerieRecibo",
//         SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
//                   ELSE P."CashSum"  * (R2."SumApplied" / P."DocTotal") END ) AS "Efectivo",
//         SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
//                   ELSE P."TrsfrSum" * (R2."SumApplied" / P."DocTotal") END ) AS "Transferencia",
//         SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
//                   ELSE P."CheckSum" * (R2."SumApplied" / P."DocTotal") END ) AS "Cheques",
//         SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
//                   ELSE P."CreditSum"* (R2."SumApplied" / P."DocTotal") END ) AS "Tarjeta",
//         SUM(R2."SumApplied")                                   AS "TotalAplicado"
//     FROM RCT2 R2
//     JOIN ORCT P ON P."DocEntry" = R2."DocNum"
//     WHERE R2."InvType" = 13
//     GROUP BY R2."DocEntry"
// ) MP
//   ON MP."InvDocEntry" = T0."DocEntry"

// -- ===== Nombres de cuentas (Efectivo) =====
// LEFT JOIN (
//   SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaEfectivo"
//   FROM (
//      SELECT DISTINCT 
//         R2."DocEntry" AS "InvDocEntry",
//         OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
//      FROM RCT2 R2
//      JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
//      JOIN OACT OA ON OA."AcctCode" = P."CashAcct"
//      WHERE R2."InvType" = 13 AND P."CashSum" > 0
//   ) X
//   GROUP BY X."InvDocEntry"
// ) N_EF ON N_EF."InvDocEntry" = T0."DocEntry"

// -- ===== Nombres de cuentas (Transferencia) =====
// LEFT JOIN (
//   SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaTransferencia"
//   FROM (
//      SELECT DISTINCT 
//         R2."DocEntry" AS "InvDocEntry",
//         OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
//      FROM RCT2 R2
//      JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
//      JOIN OACT OA ON OA."AcctCode" = P."TrsfrAcct"
//      WHERE R2."InvType" = 13 AND P."TrsfrSum" > 0
//   ) X
//   GROUP BY X."InvDocEntry"
// ) N_TR ON N_TR."InvDocEntry" = T0."DocEntry"

// -- ===== Nombres de cuentas (Cheques) =====
// LEFT JOIN (
//   SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaCheques"
//   FROM (
//      SELECT DISTINCT 
//         R2."DocEntry" AS "InvDocEntry",
//         OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
//      FROM RCT2 R2
//      JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
//      JOIN OACT OA ON OA."AcctCode" = P."CheckAcct"
//      WHERE R2."InvType" = 13 AND P."CheckSum" > 0
//   ) X
//   GROUP BY X."InvDocEntry"
// ) N_CH ON N_CH."InvDocEntry" = T0."DocEntry"

// -- ===== Nombres de cuentas (Tarjeta) via OCRC -> OACT =====
// LEFT JOIN (
//   SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentasTarjeta"
//   FROM (
//      SELECT DISTINCT 
//         R2."DocEntry" AS "InvDocEntry",
//         OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
//      FROM RCT2 R2
//      JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
//      JOIN RCT3 C  ON C."DocNum"   = P."DocEntry"
//      JOIN OCRC CC ON CC."CreditCard" = C."CreditCard"
//      JOIN OACT OA ON OA."AcctCode"   = CC."AcctCode"
//      WHERE R2."InvType" = 13
//   ) X
//   GROUP BY X."InvDocEntry"
// ) N_CC ON N_CC."InvDocEntry" = T0."DocEntry"

// WHERE 
//     T0."CANCELED" = 'N'
//     AND T0."DocDate" BETWEEN '[%0]' AND '[%1]'
//     -- excluir toda factura de reserva
//     AND NOT EXISTS (SELECT 1 FROM INV1 X 
//                     WHERE X."DocEntry" = T0."DocEntry" AND X."BaseType" = 17)
//     AND NOT EXISTS (SELECT 1 FROM DLN1 Y 
//                     WHERE Y."BaseType" = 13 AND Y."BaseEntry" = T0."DocEntry")

// ORDER BY T0."DocDate", T0."DocEntry", T1."LineNum", T6."Serie";




SELECT 
    T0."DocEntry",
    T2."SlpName"        AS "Vendedor",
    T0."U_FE_Res"       AS "Resolucion",
    T6."Serie"          AS "Serie",
    T0."U_CodTransaccion" AS "Codigo de transaccion",
    T0."U_ExternalOrderRer" AS "Orden Riqra",
    T1."Dscription"     AS "Detalle producto",
    T0."DocDate"        AS "Fecha Factura",
    T0."U_DocNom"       AS "Nombre de Factura",
    T0."U_FacNit"       AS "NIT",
    T0."U_Direccion"    AS "Dirección de Factura",
    T0."TaxDate"        AS "Fecha Contabilización",
    T0."NumAtCard"      AS "Número/Serie Doc",
    T1."ItemCode",
    T1."VatSum",
    T1."GTotal",
    T1."Quantity",
    T1."LineTotal",
    CASE WHEN T1."Quantity" = 0 THEN T1."LineTotal"
         ELSE T1."LineTotal"/T1."Quantity" END AS "Precio",
    T3."WhsName"        AS "Nombre Bodega",

    /* ===== Pagos recibidos (resumen por factura) ===== */
    MP."Cobrador",
    MP."SerieRecibo",
    MP."PagosAplicados",
    MP."PrimeraFechaPago",
    MP."UltimaFechaPago",
    MP."Efectivo",
    N_EF."CuentaEfectivo",           -- 11101003 - Caja...
    MP."Transferencia",
    N_TR."CuentaTransferencia",      -- …
    MP."Cheques",
    N_CH."CuentaCheques",            -- …
    MP."Tarjeta",
    N_CC."CuentasTarjeta",           -- …
    MP."TotalAplicado"

FROM OINV T0
JOIN INV1 T1  ON T1."DocEntry" = T0."DocEntry" AND T0."DocType" = 'I'
JOIN OSLP T2  ON T2."SlpCode"  = T0."SlpCode"
JOIN OWHS T3  ON T3."WhsCode"  = T1."WhsCode"

-- ===== Series (factura 13 + entrega ligada 15) =====
LEFT JOIN (
    SELECT DISTINCT
        S."BaseEntry"   AS "DocEntry",
        S."BaseLinNum"  AS "LineNum",
        R0."IntrSerial" AS "Serie"
    FROM SRI1 S
    JOIN OSRN R1 ON R1."ItemCode" = S."ItemCode" AND R1."SysNumber" = S."SysSerial"
    JOIN OSRI R0 ON R0."ItemCode" = R1."ItemCode" AND R0."IntrSerial" = R1."DistNumber"
    WHERE S."BaseType" = '13' AND S."Direction" = '1'
    UNION
    SELECT DISTINCT
        D1."BaseEntry"  AS "DocEntry",
        D1."BaseLine"   AS "LineNum",
        R0."IntrSerial" AS "Serie"
    FROM DLN1 D1
    JOIN SRI1 S ON S."ItemCode"   = D1."ItemCode"
               AND S."BaseType"   = '15'
               AND S."BaseEntry"  = D1."DocEntry"
               AND S."BaseLinNum" = D1."LineNum"
               AND S."Direction"  = '1'
    JOIN OSRN R1 ON R1."ItemCode" = S."ItemCode" AND R1."SysNumber" = S."SysSerial"
    JOIN OSRI R0 ON R0."ItemCode" = R1."ItemCode" AND R0."IntrSerial" = R1."DistNumber"
    WHERE D1."BaseType" = '13'
) T6
  ON T6."DocEntry" = T0."DocEntry"
 AND T6."LineNum"  = T1."LineNum"

-- ===== Pagos (ORCT/RCT2) prorrateados por factura (importes) =====
LEFT JOIN (
    SELECT
        R2."DocEntry"                                        AS "InvDocEntry",
        STRING_AGG(TO_NVARCHAR(P."DocNum"), ', ')            AS "PagosAplicados",
        MIN(P."DocDate")                                     AS "PrimeraFechaPago",
        MAX(P."DocDate")                                     AS "UltimaFechaPago",
        MAX(P."U_Cobrador")                                     AS "Cobrador",
        MAX(P."U_SerieRecibo")                                     AS "SerieRecibo",
        SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
                  ELSE P."CashSum"  * (R2."SumApplied" / P."DocTotal") END ) AS "Efectivo",
        SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
                  ELSE P."TrsfrSum" * (R2."SumApplied" / P."DocTotal") END ) AS "Transferencia",
        SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
                  ELSE P."CheckSum" * (R2."SumApplied" / P."DocTotal") END ) AS "Cheques",
        SUM( CASE WHEN P."DocTotal" = 0 THEN 0 
                  ELSE P."CreditSum"* (R2."SumApplied" / P."DocTotal") END ) AS "Tarjeta",
        SUM(R2."SumApplied")                                   AS "TotalAplicado"
    FROM RCT2 R2
    JOIN ORCT P ON P."DocEntry" = R2."DocNum"
    WHERE R2."InvType" = 13
    GROUP BY R2."DocEntry"
) MP
  ON MP."InvDocEntry" = T0."DocEntry"

-- ===== Nombres de cuentas (Efectivo) =====
LEFT JOIN (
  SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaEfectivo"
  FROM (
     SELECT DISTINCT 
        R2."DocEntry" AS "InvDocEntry",
        OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
     FROM RCT2 R2
     JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
     JOIN OACT OA ON OA."AcctCode" = P."CashAcct"
     WHERE R2."InvType" = 13 AND P."CashSum" > 0
  ) X
  GROUP BY X."InvDocEntry"
) N_EF ON N_EF."InvDocEntry" = T0."DocEntry"

-- ===== Nombres de cuentas (Transferencia) =====
LEFT JOIN (
  SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaTransferencia"
  FROM (
     SELECT DISTINCT 
        R2."DocEntry" AS "InvDocEntry",
        OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
     FROM RCT2 R2
     JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
     JOIN OACT OA ON OA."AcctCode" = P."TrsfrAcct"
     WHERE R2."InvType" = 13 AND P."TrsfrSum" > 0
  ) X
  GROUP BY X."InvDocEntry"
) N_TR ON N_TR."InvDocEntry" = T0."DocEntry"

-- ===== Nombres de cuentas (Cheques) =====
LEFT JOIN (
  SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentaCheques"
  FROM (
     SELECT DISTINCT 
        R2."DocEntry" AS "InvDocEntry",
        OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
     FROM RCT2 R2
     JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
     JOIN OACT OA ON OA."AcctCode" = P."CheckAcct"
     WHERE R2."InvType" = 13 AND P."CheckSum" > 0
  ) X
  GROUP BY X."InvDocEntry"
) N_CH ON N_CH."InvDocEntry" = T0."DocEntry"

-- ===== Nombres de cuentas (Tarjeta) via OCRC -> OACT =====
LEFT JOIN (
  SELECT X."InvDocEntry", STRING_AGG(X."AcctDisp", ', ') AS "CuentasTarjeta"
  FROM (
     SELECT DISTINCT 
        R2."DocEntry" AS "InvDocEntry",
        OA."FormatCode" || ' - ' || OA."AcctName" AS "AcctDisp"
     FROM RCT2 R2
     JOIN ORCT P  ON P."DocEntry" = R2."DocNum"
     JOIN RCT3 C  ON C."DocNum"   = P."DocEntry"
     JOIN OCRC CC ON CC."CreditCard" = C."CreditCard"
     JOIN OACT OA ON OA."AcctCode"   = CC."AcctCode"
     WHERE R2."InvType" = 13
  ) X
  GROUP BY X."InvDocEntry"
) N_CC ON N_CC."InvDocEntry" = T0."DocEntry"

WHERE 
    T0."CANCELED" = 'N'
    AND T0."DocDate" BETWEEN '[%0]' AND '[%1]'
    -- excluir toda factura de reserva
    AND NOT EXISTS (SELECT 1 FROM INV1 X 
                    WHERE X."DocEntry" = T0."DocEntry" AND X."BaseType" = 17)
    AND NOT EXISTS (SELECT 1 FROM DLN1 Y 
                    WHERE Y."BaseType" = 13 AND Y."BaseEntry" = T0."DocEntry")

ORDER BY T0."DocDate", T0."DocEntry", T1."LineNum", T6."Serie";
