package com.company;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    /**
     * 判断是否是中日韩文字
     * @param c     要判断的字符
     * @return      true或false
     */
    private static boolean isChinese(char c) {
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
                || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
                || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION
                || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
                || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {
            return true;
        }
        return false;
    }


    /**
     * 判断是否是数字或者是英文字母
     * @param c
     * @return
     */
    public static boolean judge(char c){
        if((c >='0' && c<='9')||(c >='a' && c<='z' ||  c >='A' && c<='Z')){
            return true;
        }
        return false;
    }
    public static boolean isMessyCode(String strName) {
        //去除字符串中的空格 制表符 换行 回车
        Pattern p = Pattern.compile("\\s*|\t*|\r*|\n*|#*");
        Matcher m = p.matcher(strName);
        String after = m.replaceAll("");
        //去除字符串中的标点符号
        String temp = after.replaceAll("\\p{P}", "");
        //处理之后转换成字符数组
        char[] ch = temp.trim().toCharArray();
        for (int i = 0; i < ch.length; i++) {
            char c = ch[i];
            //判断是否是数字或者英文字符
            if (!judge(c)) {
                //判断是否是中日韩文
                if (!isChinese(c)
                        && c != '\uFEFF'
                        && c != '<'
                        && c != '>'
                        && c != '='
                        && c != 169
                        && c >= 255) {
                    //如果不是数字或者英文字符也不是中日韩文则表示是乱码返回true
                    return true;
                }
            }
        }
        //表示不是乱码 返回false
        return false;
    }

    public static List<String> paths = new ArrayList();

    public static void main(String[] args) {
	// write your code here

        check("C:\\Users\\kfmechen\\Desktop\\wor\\forMoveCode\\wxwork_local_destop\\src");
//        check("C:\\Users\\kfmechen\\Desktop\\wor\\forMoveCode\\wxwork_local_destop\\tools");
//        check("C:\\Users\\kfmechen\\Desktop\\wor\\forMoveCode\\wxwork_local_destop\\package");

    }

    public static void check(String path) {
        File file = new File(path);

        readDir(file);
    }

    public static void checkfile(File file) {
        if (file.getAbsolutePath().contains("saas_service")
                || file.getAbsolutePath().contains("\\mac\\")
                || file.getAbsolutePath().endsWith(".exe")
                || file.getAbsolutePath().endsWith("protoc3.2.0")
                || file.getAbsolutePath().endsWith(".zip")
                || file.getAbsolutePath().endsWith(".pdb")
                || file.getAbsolutePath().endsWith(".gif")
                || file.getAbsolutePath().endsWith(".7z")
                || file.getAbsolutePath().endsWith(".dll")
                || file.getAbsolutePath().endsWith(".png")
                || file.getAbsolutePath().endsWith(".docx")) {
            return;
        }
        InputStream is = null;
        InputStreamReader read = null;
        try {
            is  = new FileInputStream(file);
            read = new InputStreamReader(is,"utf-8");
            BufferedReader bufferedReader = new BufferedReader(read);
            String line = null;
            int linec = 0;
            while((line=bufferedReader.readLine()) != null){
                if (isMessyCode(line) &&
                !line.contains("This program cannot be run in DOS mode.")) {
                    String path = file.getAbsolutePath() + "\\" + file.getName();
                    paths.add(path);
                    System.out.println(path);
                    System.out.println(line);
                    System.out.println(linec++);
                    System.out.println();
                    break;
                }

            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (read != null) {
                try {
                    read.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }


    public static void readDir(File dir) {
        if (!dir.isDirectory()) {
            String path = dir.getAbsolutePath() + "\\" + dir.getName();
//            System.out.println(path);
            checkfile(dir);
            return;
        }
        for(File f: dir.listFiles()) {
            readDir(f);
        }
    }
}
