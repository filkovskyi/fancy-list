export const filterItemsByName = (data, param) => {
  if (!param) {
    return data
  }

  return data.filter(account => {
    let accountName = account.name.toLowerCase()
    return accountName.indexOf(param.toLowerCase()) !== -1
  })
}

export const filterItemsByNumber = (data, param) => {
  if (param > 1) {
    const filteredArr = data.filter(account => {
      return account.accountNumber < param
    })
    return filteredArr
  } else {
    return data
  }
}

export const maxAccountNumber = data => {
  return Math.max(
    ...data.map(account => {
      return account.accountNumber
    })
  )
}

export const filteredData = (dataSet, submittedId) => {
  return dataSet.filter(i => {
    return i.id !== submittedId
  })
}

export const generatedRandomId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9)
}
