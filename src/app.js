const inputStartTime = document.getElementById('start-time')
const inputEndTime = document.getElementById('end-time')
const btnAdd = document.getElementById('btn-add')
const ulPeriods = document.getElementById('periods-list')
const pTotal = document.getElementById('total-time')

let periods = []

const KEY = {
  enter: 'Enter',
  arrowRight: 'ArrowRight',
  arrowLeft: 'ArrowLeft',
}

function resetInputs() {
  inputStartTime.value = ''
  inputEndTime.value = ''
  inputStartTime.focus()
}

// TODO: a better time validation
function isValidTime(time) {
  if (typeof time === 'string' && time.length === 5) {
    return true
  }
  return false
}

function addPeriod() {
  const startTime = inputStartTime.value
  const endTime = inputEndTime.value

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    console.error('Missing time values')
    return
  }

  periods.push({
    id: Date.now(),
    start: startTime,
    end: endTime,
  })

  console.log(periods)

  resetInputs()
  updateScreen()
}

function removePeriod(pid) {
  periods = periods.filter((p) => p.id !== pid)
  updateScreen()
}

function updateScreen() {
  let totalTimeM = 0
  ulPeriods.innerHTML = ''
  periods.forEach((p) => {
    const mti = timeToMins(p.start)
    const mtf = timeToMins(p.end)
    const mtc = mtf > mti ? mtf - mti : mtf + 24 * 60 - mti

    totalTimeM += mtc

    const btn = document.createElement('button')
    btn.innerHTML = '-'
    btn.onclick = () => removePeriod(p.id)

    const li = document.createElement('li')
    li.innerHTML = `${p.start} ~ ${p.end} (${minsToTime(mtc)})`

    li.appendChild(btn)
    ulPeriods.appendChild(li)
  })

  pTotal.innerHTML = `${minsToTime(totalTimeM)}`
}

function twoDigit(number) {
  return number.toLocaleString(navigator.language, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}

function timeToMins(time) {
  const [h, m] = time.split(':')
  return Number(h) * 60 + Number(m)
}

function minsToTime(mins) {
  return `${twoDigit(Math.floor(mins / 60))}:${twoDigit(mins % 60)}`
}

btnAdd.addEventListener('click', addPeriod)

btnAdd.addEventListener('keydown', (e) => {
  if (e.key === KEY.arrowLeft) inputEndTime.focus()
})

inputStartTime.addEventListener('keydown', (e) => {
  if (e.key === KEY.enter || e.key === KEY.arrowRight) inputEndTime.focus()
})

function funca(e) {
  if (e.key === KEY.enter) addPeriod()
  else if (e.key === KEY.arrowRight) btnAdd.focus()
  else if (e.key === KEY.arrowLeft) inputStartTime.focus()
}

inputEndTime.addEventListener('keydown', funca)
