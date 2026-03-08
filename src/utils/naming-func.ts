/**
 * Calculates similarity between two names using multiple strategies
 * @param name1 - First name to compare
 * @param name2 - Second name to compare
 * @returns Similarity score between 0 (no match) and 1 (perfect match)
 */
export function nameSimilar(name1: string, name2: string): number {
  // Normalize names: lowercase, remove extra spaces, remove special chars
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ')     // Normalize spaces
      .trim();
  };

  const n1 = normalize(name1);
  const n2 = normalize(name2);

  // Edge cases
  if (!n1 || !n2) return 0;
  if (n1 === n2) return 1;

  // Split into tokens (words)
  const tokens1 = n1.split(' ').filter(t => t.length > 0);
  const tokens2 = n2.split(' ').filter(t => t.length > 0);

  if (tokens1.length === 0 || tokens2.length === 0) return 0;

  // Strategy 1: Token overlap with position weighting
  const tokenScore = calculateTokenOverlap(tokens1, tokens2);

  // Strategy 2: Levenshtein distance for overall string similarity
  const levenshteinScore = 1 - (levenshteinDistance(n1, n2) / Math.max(n1.length, n2.length));

  // Strategy 3: Longest common subsequence ratio
  const lcsScore = longestCommonSubsequence(n1, n2) / Math.max(n1.length, n2.length);

  // Weighted combination of strategies
  const finalScore = (
    tokenScore * 0.5 +        // Token matching is most important
    levenshteinScore * 0.3 +   // Overall string similarity
    lcsScore * 0.2             // Common subsequence
  );

  // Round to 2 decimal places
  return Math.round(finalScore * 100) / 100;
}

/**
 * Calculates token overlap with fuzzy matching
 */
function calculateTokenOverlap(tokens1: string[], tokens2: string[]): number {
  const matched = new Set<number>();
  let totalScore = 0;
  let maxMatches = Math.max(tokens1.length, tokens2.length);

  for (let i = 0; i < tokens1.length; i++) {
    let bestMatch = 0;
    let bestIndex = -1;

    for (let j = 0; j < tokens2.length; j++) {
      if (matched.has(j)) continue;

      const similarity = tokenSimilarity(tokens1[i], tokens2[j]);
      if (similarity > bestMatch && similarity > 0.7) { // Threshold for considering a match
        bestMatch = similarity;
        bestIndex = j;
      }
    }

    if (bestIndex !== -1) {
      matched.add(bestIndex);
      totalScore += bestMatch;
    }
  }

  return totalScore / maxMatches;
}

/**
 * Calculates similarity between two tokens (words)
 */
function tokenSimilarity(token1: string, token2: string): number {
  if (token1 === token2) return 1;
  if (token1.length < 2 || token2.length < 2) return 0;

  // Check if one token is a substring of another
  if (token1.includes(token2) || token2.includes(token1)) {
    return Math.min(token1.length, token2.length) / Math.max(token1.length, token2.length);
  }

  // Use Levenshtein for token comparison
  const dist = levenshteinDistance(token1, token2);
  const maxLen = Math.max(token1.length, token2.length);

  return 1 - (dist / maxLen);
}

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[len1][len2];
}

/**
 * Calculates longest common subsequence length
 */
function longestCommonSubsequence(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[len1][len2];
}

// Example usage
// console.log(nameSimilar("Confidence Jackmay", "JACKMAY CONFIDENCE IDALA")); // ~0.9
// console.log(nameSimilar("Jackmay Idala Confidence", "JACKMAY CONFIDENCE IDALA")); // ~0.99
// console.log(nameSimilar("Musa Darua", "Dau'ra Musa")); // ~0.9
// console.log(nameSimilar("Inyasn Oppisa", "Oppisa Favour")); // Low score
// console.log(nameSimilar("John Smith", "John Smith")); // 1.0
// console.log(nameSimilar("John Doe", "Jane Doe")); // Low-medium
// console.log(nameSimilar("Mohamed Ali", "Mohammed Ali")); // High (handles spelling variations)