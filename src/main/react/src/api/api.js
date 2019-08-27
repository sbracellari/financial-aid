/* global token */

export const get_financial_info = async is_demo => {
  if (is_demo) {
    return {
      terms: [
        {
          description: "Fall Semester 2019",
          code: "201940",
          start: 1567569600000,
          end: 1576299600000,
          current: false
        },
        {
          description:"Winter Semester 2019",
          code: "201910",
          start: 1546491600000,
          end: 1556078400000,
          current: true
        },
        {
          description: "Fall Semester 2018",
          code: "201840",
          start: 1536120000000,
          end: 1544850000000,
          current: false
        },
        {
          description: "Summer Semester 2018",
          code: "201830",
          start: 1525665600000,
          end: 1535169600000,
          current: false
        },
        {
          description: "Winter Semester 2018",
          code: "201810",
          start: 1514955600000,
          end: 1524628800000,
          current: false
        },
        {
          description: "Fall Semester 2017",
          code: "201740",
          start: 1504670400000,
          end: 1513400400000,
          current: false
        },
        {
          description: "Winter Semester 2017",
          code: "201710",
          start: 1483506000000,
          end: 1493179200000,
          current: false
        },
        {
          description: "Fall Semester 2016",
          code: "201640",
          start: 1472702400000,
          end: 1481605200000,
          current: false
        },
        {
          description: "Winter Semester 2016",
          code: 201610,
          start: 1451970000000,
          end: 1461643200000,
          current: false
        },
        {
          description: "Fall Semester 2015",
          code: "201540",
          start: 1441252800000,
          end: 1450155600000,
          current: false
        }
      ],
      awards: [],
      holds: [],
      messages: [],
      progress: "Your status has not been reviewed yet"
    }
  }

  try {
    const response = await fetch(
      '/financialaid/v1/financial-info', {
        credentials: 'include',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token 
        }
      }
    )

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const get_current = async (selectedTerm, demo) => {
  try {
    if(demo) {
      return {
        awards: [
          {
            status: "Accepted",
            offer: "1500.00",
            paid: "0.00",
            fund: "Golden Scholarship Award"
          },
          {
            status: "Declined",
            offer: "4298.00",
            paid: "0.00",
            fund: "Government Grant"
          },
          {
            status: "Estimated",
            offer: "3523.00",
            paid: "0.00",
            fund: "PLUS Loan"
          },
          {
            status: "Declined",
            offer: "0.00",
            paid: "0.00",
            fund: "Federal Subsidized Loan"
          },
          {
            status: "Accepted",
            offer: "1352.00",
            paid: "1352.00",
            fund: "Federal Unsubsidized Loan"
          }, 
          {
            status: "Cancelled",
            offer: "0.00",
            paid: "0.00",
            fund: "Silver Scholarship Award"
          }
        ],
        holds: [
          {
            requirement: "W-2's not yet received by Financial Aid Department",
            url: "https://jsoneditoronline.org/"
          },
          {
            requirement: "Permission to disburse loans not yet granted",
            url: "https://jsoneditoronline.org/"
          },
          {
            requirement: "Promissory Note for loans not yet completed",
            url: "https://jsoneditoronline.org/"
          },
          {
            requirement: "Loan authorization charges not yet accepted or declined",
            url: "https://jsoneditoronline.org/"
          },
          {
            requirement: "All awards not yet fully disbursed",
            url: "https://jsoneditoronline.org/"
          }
        ],
        messages: [
          {
           message: "Your award notification reflects an award of $1,500 from the Golden Scholarship Award"
          }
        ],
        progress: "Eligible for financial aid"
      }
    } else {

    const response = await fetch(
      '/financialaid/v1/current-term/?termCode=' + selectedTerm,
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    
    return await response.json()
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

