
const bionicEmphasisStyles = document.createElement('style');
bionicEmphasisStyles.id = 'bionicEmphasisStyles';
bionicEmphasisStyles.innerHTML = `
    .bionic-emphasis .b-e__strong {
        font-weight: bold;
    }`
document.head.append(bionicEmphasisStyles)
const bionicTextParser = (elem) => {
    elem.childNodes.forEach((cEl, cElIndex) => {
        if (cEl.nodeType === 3) {
            const txt = cEl.data;
            const words = cEl.data.split(' ')
            words.forEach((word, index) => {
                const wordCount = word.length;
                const wordFloor = Math.floor(wordCount / 2);
                const wordSplit = wordCount - Math.min(3, wordFloor);
                words[index] = `<span class="b-e__strong">${word.substring(0, wordSplit)}</span>${word.substring(wordSplit)}`;

                // words[index] = `${word}-edited`
            })
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