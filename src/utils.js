export  const scrollToToday = today => 
{
  const row = document.querySelector(`.row-${today}`)
  today === date.getDate() ? row.className = 'today' : row.className = ''
  row.scrollIntoView({ behavior: 'smooth', block: 'center'})
}