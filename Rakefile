require 'rake'
require 'yaml'
require 'date'

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
  'assets' => "assets",
}

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

# ==fetch_env_time_parse
#  env {arg_time} for time mark
#  use as: {cmd} {arg_time}='2021-01-01 12:34:59'
#  code:
#    time_parse = fetch_env_time_parse('t')
def fetch_env_time_parse(arg_time)
  # env t for time mark
  begin
    t_env = ENV[arg_time] || ""
    if t_env == ""
      time_parse = DateTime.now
    else
      time_parse = DateTime.parse(t_env)
    end
  rescue => err
    puts "error: env by #{arg_time}=#{ENV[arg_time]}"
    time_parse = DateTime.now
  # ensure
  #   puts "mark time: #{time_parse.to_s}"
  end
  if time_parse.hour.to_s == '0'
    time_parse = DateTime.parse("#{time_parse.strftime("%Y-%m-%d")} #{DateTime.now.strftime("%H:%M:%S")} +8")
  end
  # puts "new time: #{time_parse.to_s}"
  time_parse
end

# Usage: rake post title="A Title"
desc "Begin a new post in #{CONFIG['posts']} title='A Title' t='2021-01-01 12:34:59'"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"

  # env t for time mark
  time_parse = fetch_env_time_parse('t')

  # slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  slug = title.downcase.strip.gsub(' ', '-')
  slug = slug.strip.gsub(':', ' ')
  slug = slug.strip.gsub('*', ' ')
  slug = slug.strip.gsub('?', ' ')
  slug = slug.strip.gsub('"', ' ')
  slug = slug.strip.gsub('<', ' ')
  slug = slug.strip.gsub('>', ' ')
  # fix windows path

  foldername = File.join(CONFIG['posts'], "#{time_parse.strftime('%Y')}", "#{time_parse.strftime('%m')}", "#{time_parse.strftime('%d')}")
  # if not Dir.exists?(foldername) # ruby 2.0
  if not Dir.exist?(foldername) # ruby 3.0
    abort("can not found #{foldername}, just make it") unless FileUtils.mkdir_p(foldername)
  end
  filename = File.join(foldername, "#{Time.now.strftime('%Y-%m-%d')}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted! #{filename} not overwrite") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "subtitle: \"sub title #{title.gsub(/-/,' ')}\""
    # post.puts "date: #{Time.now.strftime('%Y-%m-%d')}"
    post.puts "date: #{DateTime.now.to_s}"
    post.puts "category: "
    post.puts "cover: "
    post.puts "tags: []"
    post.puts "---"
  end
end # task :post

# Usage: rake assetsFoder t='2021-01-01 12:34:59'
desc "a new assets foder as genre and time, as: -g img t='2021-01-01 12:34:59'"
task :assetsFoder do

  # env for genre like img svg
  genre = ENV["g"] || "img"

  # env t for time mark
  time_parse = fetch_env_time_parse('t')

  foldername = File.join(CONFIG['assets'], "#{genre}", "#{time_parse.strftime('%Y')}", "#{time_parse.strftime('%m')}", "#{time_parse.strftime('%d')}")
  # if not Dir.exists?(foldername) # ruby 2.0
  if not Dir.exist?(foldername) # ruby 3.0
    abort("can not found #{foldername}, just make it") unless FileUtils.mkdir_p(foldername)
  end
  puts "now assets image at: {{site.baseurl}}/#{foldername}/"
end