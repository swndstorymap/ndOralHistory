# ND-Oral-History
ND Oral History
Southwest North Dakota Storymap Convention Guide

Shared Drive Organization (://SWNDstorymap)

    Subfolders:

        Conventions and Standards (://SWNDstorymap/Conventions and Standards)

        The primary document in this folder is this ‘Conventions and Standards’ document. This folder can also become the home for future documents containing information for entering data into Leaflet and any other notes files that we need to organize and run the Storymap.

    img_file (://SWNDstorymap/img_file)

        This folder contains the image files used to populate the thumbnails in the pin pop-up windows on the storymap. Determine size conventions.

        For images drawn from an online collection, the files should be given the same file names given by their housing repository. This file name will not appear on the storymap.

        Dickinson Museum Center (https://dmc.omeka.net/)
        The file name should match the ‘identifier’ given in that collection, if an ‘identifier’ isn’t available, it should match the ‘title’.
        For example:
        Image of the Lehigh Mine: https://dmc.omeka.net/items/show/3396
        The ‘title’ of this digital file (located below the image on this website) is ‘Lehigh Briquetting Co. mine’. The ‘identifier’ (scroll down) is ‘Lehigh_Briquetting_Co_Mine-001’
        North Dakota State Historical Society


        Digital Horizons (http://digitalhorizonsonline.org/)
        
        After uploading the file, click on the  icon (in the upper right-hand corner), select share, and in the pop-up menu under ‘General access’ change it so that the file is accessible to ‘Anyone with the link’.

    intv_file (://SWNDstorymap/intv_file)

    intv_clip (://SWNDstorymap/intv_clip)

Map Files

    Database Fields Necessary for Inclusion on the Storymap

        ‘latitude’ and ‘longitude’
        ‘loc_name’
        ‘loc_desc’
        For audio clips (with or without images):
        ‘interviewee’
        ‘intv_date’
        ‘intv_clip’
        ‘repos_link’
        For image files (with or without audio clips):
        ‘img_file’
        ‘img_link’

    Database Organization and Conventions

        Important: the spreadsheet must have the name “NDOralHistory” and be saved as a CSV for the script to work. All column headings of the database must remain the same for the script to work properly.

        Below is a description of each column, the information that should be populated in each, and information for naming conventions.

    interviewee

        Full name of the person interviewed as you would like it to appear in the storymap pin pop-up window (ie. Jane Smith, Jane (Jones) Smith, Sr. Jane Smith). This name will be included in the storymap pin pop-up window and should be populated. If the interview clip included on the map includes more than one interviewee (for example John and Jane Smith) this column can be populated as ‘John & Jane Smith’ or ‘John & Jane (Jones) Smith’. This column must have a value for a pop up to appear on the map.

    intrvee_first 

        ‘Interviewee First Name’ This column is for sortability in the database and will not appear on the map. Here the primary voice from the interview should be identified (i.e. ‘Jane’), however, the database can accommodate titles (‘Sr. Jane’) or multiple individuals (‘Jane & John’). If including a maiden name, include that in this column (i.e. ‘Jane (Jones)’).

    intrvee_last

        ‘Interviewee Last (or Family) Name’ As ‘Intrvee_Last’ this column is for sortability in the database and will not appear on the map. This column should only include the family name (i.e. ‘Smith’).

    interview_date

        The date that the interview was conducted (mm/dd/yyyy). This date will be included in the storymap pin pop-up window and should be populated. The pop up will populate with whatever value is in the column, regardless of format.

    date_rng_start and date_rng_end

        ‘Date Range Start’ and ‘Date Range End’ These columns provide a known or estimated date range of the subject matter of the interview clip included on the map. If the clip is about a specific event that happened in 1908, the start and end date should both read ‘1908’. If the clip talks about the interviewers childhood on the farm, give an approximate date range for that period (i.e. ‘1900’ and ‘1910’). Provide an estimate, this information is for database sortability and will not appear on the storymap.

    intv_file

        This column contains the name of the full-length interview file as it exists in the Google Drive project folder (://SWNDstorymap/intv_file). All files must be uploaded in .mp3 format.

        Naming conventions for audio interview files:
    
        Respository code_county code_interview date_interviewee.mp3
        Repository codes:
        North Dakota State German Russian Heritage Collection (GRHC)
        North Dakota Memories Oral History Project on Digital Horizons (NDM)
        North Dakota State Historical Society (NDHS)
        Dickinson Museum Center (DCM)
        Dunn County Historical Society and Museum (DCHS)
        UW-Madison (UW)
        County: We can use the same county codes as the state does
        Stark (SK)
        Dunn (DU) 
        Hettinger (HT)
        Slope (SL)
        8-character date: yyyymmdd
        4-character interviewee name: First Initial, First two letters of last name, number (Jay Frank would be JFR1, Jeff Frank would be JFR2)

        Example: Evelyn Jensen’s full interview file would be: UW_SK_20210610_EJE1.mp3

    intv_clip

        This column contains the name of the clip of the interview as it exists in the Google Drive project folder (://SWNDstorymap/intv_clip)  and the project folder  (/data/intv_clip). This is the clip to be included on the storymap. The name of the interview clip should match the full interview file name and also include the clip number.

        All files must be uploaded in .mp3 format.

        Naming conventions for audio interview clip files:
        
        Respository code_county code_interview date_interviewee_clip number.mp3
        Repository codes (see above)
        County codes (see above)
        8-character date: yyyymmdd
        4-character interviewee name: First Initial, First two letters of last name, number (Jay Frank would be JFR1, Jeff Frank would be JFR2)
        3-character clip number (‘001’, ‘002’, etc.)

        Example: Evelyn Jensen’s full interview file would be: UW_SK_20210610_EJE1.mp3
        Individual clips drawn from that interview file would be: UW_SK_20210610_EJE1_001.mp3; UW_SK_20210610_EJE1_002.mp3 
        img_name
        
        The name of the image as it appears in the Google Drive in the ‘img_file’ folder (://SWNDstorymap/img_file) and the project folder (/img), INCLUDING the file extension (i.e. .jpeg, .jpg, etc.) For the program code to populate the image on the map the text in this cell must match the image file name exactly.
    
    img_link
    
        The data in this column is used to populate the photo hyperlink in the pin pop-up window on the storymap, which will bring the viewer directly to the image in its housing digital collection. This column should contain the link to the photograph in its digital collection, that is, wherever you want to direct the user to when they click on the image.
        
    repository
    
        This column contains the name of the housing repository of the full-length oral interview. (i.e. Dickinson History Museum, Dunn County Historical Society and Museum, North Dakota State Historical Society, …)
        
    Repos_link

        This column contains, if available, the link to the full-length oral history audio file in its repository. If the audio file is not available online, then this column should contain a link to the collection’s website
        
        Dickinson History Museum: https://dmc.omeka.net/
        Bicentennial Stories (in Dickinson History Museum: https://dmc.omeka.net/collections/show/2 
        Dunn County Historical Society and Museum: https://dunncountymuseum.org/
        etc.
    
    loc_county
    
        ‘Location County’ This column provides the location of the subject matter of the interview clip included on the map. This information is for database sortability and will not appear on the storymap.
    
    loc_town
    
        ‘Location Town’ This column provides the location of the subject matter of the interview clip included on the map. If the clip discusses a specific town (i.e. Dickinson, Lefor, Dunn Center, New England, etc.) enter this information here. If the location is outside of a named town, populate this column with the vicinity instead (i.e. Gladstone vicinity). This information is for database sortability and will not appear on the storymap.
    
    loc_name
    
        ‘Location Name’ The entry in this column will appear on the storymap as the title of the map pin pop-up window and must be populated. This should identify the place that the audio clip or image is describing. Examples include: The Jones Farmstead, Smith’s General Store, Rural School near Schefield, St. Joseph’s Church, etc. 

    latitude and longitude
    
        These columns must be populated in decimal degrees for Leaflet to populate a map pin. 
    
    loc_desc
    
        ‘Location description’. The text entered here will appear on the storymap as the description/text blurb of the map pin pop-up window and must be populated. This text should provide a brief summary or description of what the user is seeing/hearing when clicking on the pin. Priority is given to summary of the audio over description of the image.
    
    tags
    
    Notes/description