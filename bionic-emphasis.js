
const bionicEmphasisStyles = document.createElement('style');
bionicEmphasisStyles.id = 'bionicEmphasisStyles';
bionicEmphasisStyles.innerHTML = `
    .bionic-emphasis .be_s {
        font-weight: bold;
    }`
document.head.append(bionicEmphasisStyles)
const bionicTextParser = (elem) => {
    const assembleWord = (w) => {
        const wordSplit = Math.ceil(w.length / 2);
        return `<span class="be_s">${w.substring(0, wordSplit)}</span>${w.substring(wordSplit)}`
    }
    elem.childNodes.forEach((cEl, cElIndex) => {
        if (cEl.nodeType === 3) {
            const words = cEl.data.split(' ');
            words.forEach((word, index) => {
                let wrdStr = assembleWord(word);
                if (/\xa0|&nbsp;| /.test(word)) {
                    word.split('\xa0').forEach((wd, wdi) => {
                        wrdStr = wdi === 0 ? assembleWord(wd) : `${wrdStr}\xa0${assembleWord(wd)}`;
                    })
                }
                words[index] = wrdStr;

                // words[index] = `${word}-edited`
            });
            console.log(words);
            const emphisizedWordsElem = document.createElement('span');
            emphisizedWordsElem.innerHTML = words.join(" ");
            // cEl.data = emphisizedWordsElem.innerHTML;
            elem.replaceChild(emphisizedWordsElem, elem.childNodes[cElIndex])
        } else if (cEl.nodeType === 1) {
            bionicTextParser(cEl);
        }
    });
}
bionicTextParser(elem);