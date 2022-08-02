/**
 * Manacher's algorithm to find the longest palindrome in a string
 * written in JavaScript
 *
 * O(n) Time & Space
 * @param string
 * @returns {string}
 */
export function longestPalindromicSubstring(string) {
	const newString = "#" + string.split("").join("#") + "#";
	let center = 0, radius = 0, lpsCenter = 0, lpsRadius = 0;
	let dp = Array(newString.length);
	for (let i = 0; i < newString.length; i++) {
		if (center + radius > i) {
			const iMirror = center - (i - center);
			dp[i] = Math.min(dp[iMirror], (center + radius) -i);
		} else {
			dp[i] = 1;
		}

		while (i + dp[i] < newString.length &&
		i - dp[i] >= 0 &&
		newString[i + dp[i]] === newString[i - dp[i]]) dp[i]++;

		if (center + radius < i + dp[i]) {
			center = i;
			radius = dp[i];
		}

		if (lpsRadius < dp[i]) {
			lpsRadius = dp[i];
			lpsCenter = i;
		}
	}

	const start = (lpsCenter - lpsRadius + 1)/2;
	const end = (lpsCenter + lpsRadius - 1)/2;
	return string.substring(start, end);
}